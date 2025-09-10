document.getElementById('rwhForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const roofArea = parseFloat(document.getElementById('roofArea').value);
  const rainfall = parseFloat(document.getElementById('rainfall').value);
  const runoffCoeff = parseFloat(document.getElementById('runoffCoeff').value);
  const soilType = document.getElementById('soilType').value;
  const slope = document.getElementById('slope').value;

  // Volume = Area (m²) * Rainfall (mm) * Runoff Coefficient / 1000
  const volume = (roofArea * rainfall * runoffCoeff) / 1000;

  // Suggest tank size (rounded up to nearest 1000 L)
  const suggestedTankSize = Math.ceil(volume / 1000) * 1000;

  // Artificial recharge feasibility
  let rechargeFeasibility = '';
  if (soilType === 'sandy' && slope === 'flat') {
    rechargeFeasibility = 'Highly suitable for recharge pits or trenches.';
  } else if (soilType === 'loamy') {
    rechargeFeasibility = 'Suitable for recharge trenches or wells.';
  } else if (soilType === 'clayey') {
    rechargeFeasibility = 'Low infiltration – consider storage or filtration tank.';
  }

  document.getElementById('result').innerHTML = `
    <h3>Results:</h3>
    <p><strong>Harvestable Rainwater:</strong> ${volume.toFixed(2)} m³ (${(volume * 1000).toFixed(0)} liters)</p>
    <p><strong>Suggested RWH Tank Size:</strong> ${suggestedTankSize} liters</p>
    <p><strong>Artificial Recharge Potential:</strong> ${rechargeFeasibility}</p>
  `;
});
