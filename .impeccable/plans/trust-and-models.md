# Trust and AI models: plan for the Seafin homepage

Researched 2026-10-05. Two reports: trust signals for a new, founder-anonymous services firm; and vendor facts for Anthropic, OpenAI, the three big clouds and open-weight models. Nothing below is on the site until approved.

## 1. Where it runs: three tiers (replaces the two-option section)

Proposed copy:

- **Direct from the AI company.** Anthropic's Claude or OpenAI's models, through their own APIs. Fastest to set up and lowest cost. Neither company trains its models on business API data by default. Right for work that doesn't involve sensitive data.
- **Inside your own cloud account.** Claude and OpenAI models through AWS Bedrock, Microsoft Azure or Google Cloud, in the region you choose, under that provider's compliance terms, including its HIPAA agreement where the service is covered. Government-grade (FedRAMP) options exist. The default for healthcare, finance and government contractors.
- **On your own servers.** Open-source models such as OpenAI's gpt-oss, Google's Gemma, Qwen or Mistral Small, on your own hardware or private cloud. Your data stays on your equipment.
- Footer line: "The audit decides which tier each workflow belongs in."

Facts behind it (sources in section 5):
- Anthropic does not train on API or commercial data by default [1]; OpenAI does not train on API data unless you opt in [8].
- AWS Bedrock is the cleanest compliant tier: it offers Claude (Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 4.5) and OpenAI (GPT-5.4/5.6/6, gpt-oss) [5][20], is HIPAA-eligible [21], does not share content with model providers [22], and lists these models under FedRAMP Moderate, with Claude 5.5 and GPT-5.4/5.6 under GovCloud High [20].
- Azure: OpenAI models run in Azure, not shared with OpenAI [13], Azure OpenAI is FedRAMP High in commercial and Government [15]; Azure's BAA covers in-scope services [14] (Azure OpenAI not individually confirmed). Claude on Azure Foundry is not HIPAA-ready per Anthropic [3]; check before using it for health data.
- Google Cloud: Claude available [24]; whether Claude on Vertex is under Google's BAA is unconfirmed [25].
- Open-weight licences: gpt-oss, Gemma 4, Qwen3.8-27B, Mistral Small 4 are Apache 2.0; Llama 4 has its own licence terms [19]. Roughly 24 GB of GPU memory runs a useful 27-31B model at 4-bit (estimate).

## 2. Questions section: three answers to add or change

- **Which AI do you use?** Whichever fits the job: Anthropic's Claude, OpenAI's models, or open-source models on your own servers. You're never locked to one vendor.
- **Is our data used to train AI models?** Not by default. Anthropic and OpenAI don't train on business API data unless you opt in, and inside your own cloud account the provider doesn't share it with them. Open-source models on your servers never send it anywhere.
- **Can it run without the cloud?** Yes. Open-source models can run on your own hardware or private cloud.

## 3. Vendor names: text only

Write "built on Claude", "works with OpenAI", "runs on Microsoft Azure / AWS / Google Cloud" in plain text. No logos and no "partner" or "certified" until earned [7][12][18]. (A reading of the trademark pages, not legal advice.)

## 4. Trust without a name

**On the site now**
1. Reachability: reply within one business day (done), a business phone, the domain email, and city and state. Full address only if it's a real office or coworking space. Fast replies, address and phone scored highest for credibility; photos of staff scored lowest (Stanford, Fogg et al. 2001).
2. Openness: published audit price, fixed scope, process and the sample report (done).
3. Risk reversal: a money-back guarantee on the $499 audit only. Low-price guarantees from lesser-known sellers are believable; high-price ones aren't (Jeng et al. 2014). Builds keep staged payments with sign-off.
4. A "How we handle your data" page: the three tiers, access limited to what the work needs, NDA on request, data deleted at the end of an engagement, mapped to NIST CSF 2.0 Small Business Quick-Start. Offer a BAA only once Seafin is ready to meet a business associate's HIPAA duties.
5. Anonymous credentials, wording to approve: "Led by a senior engineer with 20 years in IT and security operations across federal government, healthcare, manufacturing and retail. CompTIA Security+. Experience under HIPAA, PCI-DSS, SOC 2 and federal security requirements." (Navy service and exact years are searchable; owner's call.)

**Next 30 days**
1. Free profiles: LinkedIn company page, Clutch (verified tier), D-U-N-S number. Google Business Profile needs a real address on file with Google, so skip it unless that's acceptable.
2. Same LLC name, EIN, domain email and phone everywhere.
3. Individual certification: Claude Certified Architect. Anthropic partner tiers need 10 certified people [6], OpenAI's partner bar is sales-led [11], Microsoft Solutions Partner needs 70 points and a fee [16]: none realistic yet.
4. Cyber and tech E&O insurance (often a contract requirement).
5. Three or four useful articles under the company name.

**From the first clients**
1. A founding-client discount in exchange for a written case study, disclosed, never for positive wording (FTC rule, Oct 2024).
2. Measured hours saved and a client-approved quote.
3. A referral ask at every handoff; referrals drive most SMB IT provider choices (Datto 2019).
4. Clutch and Google reviews, never paid for tone.

**Never**
- "HIPAA certified": no such certification exists (HHS). Say "we sign a BAA" once you do.
- Partner badges, logos or awards not earned.
- Stock photos of people.

## 5. Sources

Trust: credibility.stanford.edu/guidelines; credibility.stanford.edu/pdf/p61-fogg.pdf; nngroup.com/articles/trustworthy-design; datto.com SMB market report (2019); hhs.gov HIPAA certification FAQ; ftc.gov fake-reviews rule (2024-08); nvlpubs.nist.gov NIST.SP.1300; help.clutch.co verification; ariesconsultinggroup.com and aiessentials.us (published audit pricing examples).

Vendors (date seen):
[1] privacy.claude.com/en/articles/7996868 (2026-08-18) · [3] platform.claude.com/docs/en/manage-claude/api-and-data-retention · [4] privacy.claude.com/en/articles/8114513 · [5] platform.claude.com/docs (Bedrock, Vertex, Foundry pages) · [6] anthropic.com/news/services-track-partner-hub (2026-06-03) · [7] anthropic.com/news/claude-partner-network (2026-03-12); anthropic.com/legal/trademark-guidelines · [8] developers.openai.com/api/docs/guides/your-data · [9] help.openai.com/en/articles/20001069 (2026-10-05) · [11] openai.com/index/introducing-openai-partner-network (2026-06-14) · [12] openai.com/brand · [13] learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy (2026-05-18) · [14] learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us · [15] learn.microsoft.com azure-services-in-fedramp-auditscope (2026-09-21) · [16] learn.microsoft.com partner-center solutions-partner-azure (2026-06-30) · [18] microsoft.com trademarks · [19] huggingface.co model pages · [20] aws.amazon.com/compliance/services-in-scope/FedRAMP/amazon-bedrock-models (2026-10-01) · [21] aws.amazon.com/compliance/hipaa-eligible-services-reference (2026-09-03) · [22] aws.amazon.com/bedrock/faqs · [24] docs.cloud.google.com partner-models/claude (2026-10-01) · [25] docs.cloud.google.com/docs/security/compliance/hipaa
