try {
    const preference = localStorage.getItem('codeventure-theme') || 'light';
    document.documentElement.dataset.theme = preference === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : preference;
} catch {
    document.documentElement.dataset.theme = 'light';
}
