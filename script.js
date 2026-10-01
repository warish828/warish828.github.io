const $ = id => document.getElementById(id);

$("year").textContent = new Date().getFullYear();

$("menuBtn").addEventListener("click", () => $("navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => $("navLinks").classList.remove("open")));

$("checkPassword").addEventListener("click", () => {
  const p = $("password").value;
  let score = 0;
  if (p.length >= 8) score++;
  if (p.length >= 12) score++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"];
  $("passwordResult").textContent = p ? labels[score] : "Enter a password to test.";
});

async function digest(algorithm, text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest(algorithm, data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,"0")).join("");
}
$("generateHash").addEventListener("click", async () => {
  const text = $("hashInput").value;
  if (!text) return $("hashResult").textContent = "Enter text.";
  $("hashResult").textContent = await digest($("hashAlgorithm").value, text);
});

$("encode64").addEventListener("click", () => {
  try { $("base64Result").textContent = btoa(unescape(encodeURIComponent($("base64Input").value))); }
  catch { $("base64Result").textContent = "Could not encode."; }
});
$("decode64").addEventListener("click", () => {
  try { $("base64Result").textContent = decodeURIComponent(escape(atob($("base64Input").value))); }
  catch { $("base64Result").textContent = "Invalid Base64."; }
});

$("analyzeUrl").addEventListener("click", () => {
  try {
    const u = new URL($("urlInput").value);
    $("urlResult").innerHTML =
      `<b>Protocol:</b> ${u.protocol}<br><b>Host:</b> ${u.hostname}<br><b>Path:</b> ${u.pathname || "/"}`;
  } catch { $("urlResult").textContent = "Invalid URL."; }
});

$("getIp").addEventListener("click", async () => {
  $("ipResult").textContent = "Checking...";
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    const d = await r.json();
    $("ipResult").textContent = d.ip;
  } catch { $("ipResult").textContent = "Unable to retrieve IP."; }
});
