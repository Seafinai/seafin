// Seafin tweaks panel mount — plain JS (no JSX)
(() => {
  const root = document.createElement('div');
  root.id = 'tweaks-root';
  document.body.appendChild(root);

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroAnimation": "currents",
    "headlineStyle": "department",
    "showStockBand": true
  }/*EDITMODE-END*/;

  const h = React.createElement;

  function SeafinTweaks() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

    React.useEffect(() => {
      if (window.__seafinSetHeroMode) window.__seafinSetHeroMode(t.heroAnimation);
    }, [t.heroAnimation]);

    React.useEffect(() => {
      const h1 = document.querySelector('.hero h1');
      if (!h1) return;
      const variants = {
        department: 'An AI department,<br><em>without</em> the headcount.',
        navigate: '<em>Navigate</em> AI<br>without hiring for it.',
        deploy: 'Claude, <em>actually</em><br>deployed in your business.',
        partner: 'Your AI partner —<br>before you have an <em>AI team</em>.'
      };
      h1.innerHTML = variants[t.headlineStyle] || variants.department;
    }, [t.headlineStyle]);

    React.useEffect(() => {
      const band = document.querySelector('.partner-band');
      if (band) band.style.display = t.showStockBand ? '' : 'none';
    }, [t.showStockBand]);

    return h(window.TweaksPanel, { title: 'Seafin tweaks' },
      h(window.TweakSection, { label: 'Hero animation' },
        h(window.TweakRadio, {
          label: 'Style',
          value: t.heroAnimation,
          options: ['currents', 'sonar', 'aurora'],
          onChange: (v) => setTweak('heroAnimation', v)
        })
      ),
      h(window.TweakSection, { label: 'Headline copy' },
        h(window.TweakSelect, {
          label: 'Variant',
          value: t.headlineStyle,
          options: [
            { value: 'department', label: 'AI dept · headcount' },
            { value: 'navigate', label: 'Navigate AI · no hiring' },
            { value: 'deploy', label: 'Claude · actually deployed' },
            { value: 'partner', label: 'Partner · before AI team' }
          ],
          onChange: (v) => setTweak('headlineStyle', v)
        })
      ),
      h(window.TweakSection, { label: 'Layout' },
        h(window.TweakToggle, {
          label: 'Show stack band',
          value: t.showStockBand,
          onChange: (v) => setTweak('showStockBand', v)
        })
      )
    );
  }

  function tryMount() {
    if (!window.TweaksPanel || !window.useTweaks || !window.TweakSection) {
      setTimeout(tryMount, 80);
      return;
    }
    ReactDOM.createRoot(root).render(h(SeafinTweaks));
  }
  tryMount();
})();
