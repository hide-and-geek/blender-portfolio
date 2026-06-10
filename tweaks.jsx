/* hide & geek — Tweaks panel */
const { useEffect } = React;

const HG_DEFAULTS = /*EDITMODE-BEGIN*/{
  "type": "modern",
  "accent": "#3fd0e0",
  "motion": true
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  "#3fd0e0": "cyan",
  "#79c0ff": "ice",
  "#2fd4be": "teal",
  "#b69cff": "violet",
  "#f5b454": "amber"
};

function HGTweaks() {
  const [t, setTweak] = useTweaks(HG_DEFAULTS);

  useEffect(() => {
    document.body.setAttribute('data-type', t.type);
  }, [t.type]);

  useEffect(() => {
    document.body.setAttribute('data-accent', ACCENT_MAP[t.accent] || 'cyan');
  }, [t.accent]);

  useEffect(() => {
    document.body.classList.toggle('no-motion', !t.motion);
  }, [t.motion]);

  return (
    <TweaksPanel>
      <TweakSection label="Typography" />
      <TweakRadio
        label="Typeface"
        value={t.type}
        options={[
          { value: 'modern', label: 'Modern' },
          { value: 'techy', label: 'Techy' },
          { value: 'editorial', label: 'Serif' }
        ]}
        onChange={(v) => setTweak('type', v)}
      />

      <TweakSection label="Accent" />
      <TweakColor
        label="Glow colour"
        value={t.accent}
        options={['#3fd0e0', '#79c0ff', '#2fd4be', '#b69cff', '#f5b454']}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Motion" />
      <TweakToggle
        label="Animations"
        value={t.motion}
        onChange={(v) => setTweak('motion', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<HGTweaks />);
