# Ransomware Protection & Retention Locks Implementation Guide

## Executive Summary

This document captures research and implementation recommendations for adding ransomware protection to Custodian. Key insight: **Retention locks are application-level protection that stop API-based deletion, but true prevention requires cloud-native Object Lock (S3, Azure, etc.).**

---

## Product Overview

### Custodian Identity
- **Product Name:** Custodian
- **Company:** Seafin LLC
- **Tagline:** "Privacy-first backup orchestration"
- **Domain:** custodian.io (or alternative)
- **Model:** Control plane SaaS + agent-based backup
- **Target Markets:** MSPs, SMBs, creative professionals, compliance-heavy industries

---

## Market Validation

### Market Size
- **Cloud Backup-as-a-Service:** $25.97B (2024) → $68.9B (2030), 17.5% CAGR
- **Cloud Backup Market:** $7.93B in 2026
- **SMBs/SMEs:** Account for ~70% of cloud backup market

### Target Markets
1. **MSPs** - Resell to multiple clients, recurring revenue per client
2. **Small Businesses** - 83% want cloud-based backup; pain points: cost, control, compliance
3. **Creative Professionals** - High willingness to pay for privacy
4. **Compliance-Heavy Industries** - Healthcare, legal, finance; need to own backup data

### Why File/Folder Backup (Not VMs)
- ✅ Dominated by SMBs/MSPs (fastest growth segment)
- ✅ Simpler implementation than VM backup
- ✅ Faster sales cycles
- ✅ Less technical barrier to adoption
- ✅ You avoid competing with expensive players (Veeam, Rubrik)

---

## Ransomware Protection: The Reality

### What Prevention Actually Means

**Retention locks prevent API-level deletion:**
```
Without locks:
1. Attacker gets backup API credentials
2. Calls DELETE /api/backups/*
3. All backups deleted
4. Game over

With locks:
1. Attacker gets backup API credentials
2. Calls DELETE /api/backups/*
3. App checks: locked_until > now? → YES
4. Returns 403 "Locked until 2025-01-17"
5. Backup survives
6. Customer restores from 7-day-old backup
```

**Retention locks DON'T prevent:**
- Infrastructure compromise (attacker gets direct cloud storage access)
- Database tampering (attacker removes lock timestamp)
- Direct filesystem/storage access

### True Prevention = Cloud Infrastructure

**AWS S3 Object Lock** (real immutability):
- Enforced at storage layer, not application layer
- Even AWS can't delete early
- Works even if your entire infrastructure is compromised
- Customer must enable it on their S3 bucket

**Your role:** Document that customers should enable Object Lock for true protection.

---

## Implementation Roadmap

### Phase 1: Retention Locks (Application-Level) - 4-6 hours

**Database Changes:**
```sql
ALTER TABLE backup_history ADD COLUMN locked_until TIMESTAMP;
ALTER TABLE backup_history ADD COLUMN lock_reason TEXT; -- enum: retention, compliance, manual
ALTER TABLE backup_history ADD COLUMN is_locked BOOLEAN DEFAULT FALSE;
```

**Code Changes:**
- `database.py` - Add lock columns and constraints
- `retention.py` - Check lock status before deletion
- `routes/backups.py` - New endpoint `/api/backups/{id}/lock`
- `backup_manager.py` - Set `locked_until` after successful backup

**Implementation:**
```python
# In retention.py
def execute_retention_cleanup(config_id):
    to_delete = get_expired_backups(config_id)

    for backup in to_delete:
        if backup.locked_until and backup.locked_until > datetime.now():
            skip_backup(backup)  # Can't delete locked backups
        else:
            delete_backup(backup)
```

**API Endpoint (new):**
```python
@app.route('/api/backups/<id>/lock', methods=['POST'])
def lock_backup(id):
    backup = Backup.get(id)
    backup.locked_until = datetime.now() + timedelta(days=request.json['days'])
    backup.lock_reason = request.json['reason']  # compliance, retention, etc.
    backup.save()
    return {'locked_until': backup.locked_until}
```

---

### Phase 2: Anomaly Detection (PyOD Integration) - 4-5 hours

**Libraries:**
- `PyOD` - 50+ anomaly detection algorithms
- Install: `pip install pyod`
- 26M+ downloads, battle-tested

**What to Detect:**
1. **Backup size anomalies** - Ransomware encrypts → larger files
2. **Compression ratio spikes** - Encrypted files = high entropy
3. **Deletion bursts** - >5 backups/hour deleted = suspicious
4. **Validation failures** - Consistent backup validation failures

**New File: `backup_engine/anomaly_detector.py`**
```python
from pyod.models.isolation_forest import IsolationForest
import numpy as np

class BackupAnomalyDetector:
    def __init__(self):
        self.detector = IsolationForest(contamination=0.1)

    def check_backup_metrics(self, backup_history):
        """Detect anomalies in recent backup patterns"""
        sizes = np.array([b.size_bytes for b in backup_history[-20:]])
        compression = np.array([b.compression_ratio for b in backup_history[-20:]])

        features = np.column_stack([sizes, compression])
        predictions = self.detector.fit_predict(features)

        anomalies = [backup_history[-20:][i] for i, p in enumerate(predictions) if p == -1]

        return {
            'is_anomaly': len(anomalies) > 0,
            'anomalies': anomalies,
            'severity': 'high' if len(anomalies) > 2 else 'medium'
        }
```

**Database Table: `backup_metrics`**
```sql
CREATE TABLE backup_metrics (
    id INTEGER PRIMARY KEY,
    backup_id INTEGER NOT NULL,
    metric_type TEXT,  -- size_change, compression_ratio, deletion_count, etc.
    expected_value FLOAT,
    actual_value FLOAT,
    severity TEXT,  -- low, medium, high
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (backup_id) REFERENCES backup_history(id)
);

CREATE TABLE backup_anomalies (
    id INTEGER PRIMARY KEY,
    config_id INTEGER NOT NULL,
    anomaly_type TEXT,  -- size_spike, compression_change, deletion_burst
    severity TEXT,
    description TEXT,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_acknowledged BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (config_id) REFERENCES backup_configs(id)
);
```

---

### Phase 3: Incremental Chain Protection - 2-3 hours

**What it does:** Prevents deletion of full backups that have incremental backups depending on them.

**Code Changes: `retention.py`**
```python
def get_dependent_backups(backup_id):
    """Find all incremental backups that depend on this full backup"""
    return db.query(BackupHistory).filter(
        BackupHistory.parent_backup_id == backup_id
    ).all()

def can_delete_backup(backup):
    """Check if backup can be safely deleted"""
    # Check if backup is locked
    if backup.locked_until and backup.locked_until > datetime.now():
        return False, "Backup is locked"

    # Check if other backups depend on it
    dependents = get_dependent_backups(backup.id)
    if dependents:
        return False, f"Cannot delete: {len(dependents)} incremental backups depend on this"

    return True, "Safe to delete"
```

**API Response Enhancement:**
```python
{
    'backups': [
        {
            'id': 123,
            'can_delete': False,
            'reasons': [
                'Backup is locked until 2025-01-17',
                'Cannot delete: 8 incremental backups depend on this'
            ]
        }
    ]
}
```

---

### Phase 4: Validation Gates (Optional, Lower Priority) - 5-7 hours

**Add backup states:**
```sql
ALTER TABLE backup_history ADD COLUMN validation_status TEXT DEFAULT 'pending';
-- States: pending, validating, passed, failed, quarantined
```

**Prevent restoration from unvalidated backups:**
```python
def restore_backup(backup_id):
    backup = Backup.get(backup_id)

    if backup.validation_status != 'passed':
        if backup.validation_status == 'failed':
            raise Exception("Backup failed validation. Review before restoring.")
        elif backup.validation_status == 'pending':
            raise Exception("Backup validation in progress.")

    # OK to restore
    return execute_restore(backup_id)
```

---

## Python Libraries & Tools

### For Anomaly Detection
- **PyOD** (Recommended) - `pip install pyod`
  - 50+ detection algorithms
  - Works on any numerical metrics (backup size, compression ratio, deletion rate)
  - No external dependencies needed
  - 26M+ downloads, production-ready

- **ADTK** - `pip install adtk` (Alternative)
  - Specialized for time series anomaly detection
  - Good for trending backup patterns over time
  - Simpler API than PyOD

### For Malware/Ransomware Pattern Detection (Advanced, Optional)
- **YARA + yara-python** - Pattern matching for known ransomware signatures
  - Can scan backup file contents during validation
  - Requires downloading YARA rules from community sources
  - Integration time: 3-4 hours
  - More useful for detecting already-encrypted files in backups

---

## Marketing Angle

**DO NOT claim:** "Prevents ransomware"

**DO claim:**
1. **"Retention locks protect against accidental deletion and basic attacks"**
   - Retention locks prevent API-based deletion for N days
   - Backups locked immediately after creation
   - No admin can delete locked backups through the application

2. **"Anomaly detection alerts you to ransomware activity"**
   - PyOD detects unusual backup patterns (size spikes, compression changes)
   - Automatic alerts when suspicious activity detected
   - Gives time to isolate machines and plan recovery

3. **"For true ransomware protection, enable cloud-native Object Lock"**
   - Document S3 Object Lock, Azure Blob Immutable Storage
   - Customer enables on their storage account
   - Gives immutability enforcement at storage layer
   - Your responsibility: document the setup process

**Differentiator:** "Most affordable backup solution with built-in retention locks + anomaly detection + privacy-first architecture"

---

## Success Metrics

- **Launch:** 100 free signups, 10 paid conversions, <5% churn
- **Growth (Month 4-12):** 1,000 users, $5k MRR, NPS >40
- **Scale (Year 2+):** 10,000 users, $50k MRR, break-even

---

## References

### Market Research
- Cloud Backup-as-a-Service: $25.97B (2024) → $68.9B (2030)
- MSP360 Managed Backup: #1 market share, tiered pricing model
- Small business pain points: cost, control, compliance, fast recovery

### Technical
- PyOD: https://github.com/yzhao062/pyod
- ADTK: https://github.com/arundo/adtk
- YARA: https://virustotal.github.io/yara/
- yara-python: https://github.com/VirusTotal/yara-python

### Architecture
- Backup engine: Native + Rclone integration
- Database: SQLite with WAL mode
- Existing protections: SHA-256 checksums, audit logging, CSRF protection
- Incremental backup chains already implemented

---

## Next Steps

1. **Create retention lock schema** - Add `locked_until`, `lock_reason` columns
2. **Implement retention lock validation** - Check before deletion
3. **Integrate PyOD** - Add anomaly detection to metrics tracking
4. **Document best practices** - S3 Object Lock, network isolation, separate credentials
5. **Update marketing** - Emphasize "retention locks + anomaly detection" (not full prevention)

---

*Last Updated: 2025-01-10*
*Status: Research Complete - Ready for Development*
