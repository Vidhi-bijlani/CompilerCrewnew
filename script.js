document.getElementById('rwhForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const roofArea = parseFloat(document.getElementById('roofArea').value);
  const rainfall = parseFloat(document.getElementById('rainfall').value);
  const runoffCoeff = parseFloat(document.getElementById('runoffCoeff').value);
  const soilType = document.getElementById('soilType').value;
  const slope = document.getElementById('slope').value;
  const familySize = parseInt(document.getElementById('familySize').value);
  const perPersonNeed = parseFloat(document.getElementById('perPersonNeed').value);

  // Harvestable volume (m³ → liters)
  const volume = (roofArea * rainfall * runoffCoeff) / 1000; 
  const volumeLiters = volume * 1000;

  // Suggested tank size (rounded to nearest 1000L)
  const suggestedTankSize = Math.ceil(volumeLiters / 1000) * 1000;

  // Annual water demand
  const annualDemand = familySize * perPersonNeed * 365;

  // Water sufficiency check
  let sufficiency = '';
  let sufficiencyFlag = false;
  if (volumeLiters >= annualDemand) {
    sufficiency = '✅ Harvested water can meet the full annual demand!';
    sufficiencyFlag = true;
  } else {
    const percent = ((volumeLiters / annualDemand) * 100).toFixed(1);
    sufficiency = `⚠️ Harvested water can meet only about ${percent}% of the annual demand.`;
  }

  // Artificial recharge feasibility
  let rechargeFeasibility = '';
  if (soilType === 'sandy' && slope === 'flat') {
    rechargeFeasibility = 'Highly suitable for recharge pits or trenches.';
  } else if (soilType === 'loamy') {
    rechargeFeasibility = 'Suitable for recharge trenches or wells.';
  } else if (soilType === 'clayey') {
    rechargeFeasibility = 'Low infiltration – consider storage or filtration tank.';
  }

  // Suggestions based on results
  let suggestionsList = [];
  if (!sufficiencyFlag) {
    suggestionsList.push("Consider increasing storage capacity to capture more rainfall.");
    suggestionsList.push("Adopt water-saving practices (low-flow taps, recycling greywater).");
  } else {
    suggestionsList.push("Your harvested water can fully support your family’s needs. Ensure proper tank maintenance.");
  }

  if (soilType === "clayey") {
    suggestionsList.push("Since clayey soil has low infiltration, focus more on storage rather than recharge.");
  } else if (soilType === "sandy") {
    suggestionsList.push("Sandy soil has good infiltration; build recharge pits to improve groundwater levels.");
  }

  if (slope === "steep") {
    suggestionsList.push("On steep slopes, provide proper diversion channels to reduce runoff losses.");
  }

  // Show results
  document.getElementById('result').innerHTML = `
    <h3>Results:</h3>
    <p><strong>Harvestable Rainwater:</strong> ${volume.toFixed(2)} m³ (${volumeLiters.toFixed(0)} liters)</p>
    <p><strong>Suggested RWH Tank Size:</strong> ${suggestedTankSize} liters</p>
    <p><strong>Annual Water Demand (Family of ${familySize}):</strong> ${annualDemand.toLocaleString()} liters</p>
    <p><strong>Water Sufficiency:</strong> ${sufficiency}</p>
    <p><strong>Artificial Recharge Potential:</strong> ${rechargeFeasibility}</p>
  `;

  // Show suggestions
  document.getElementById('suggestions').innerHTML = `
    <h4>💡 Suggestions:</h4>
    <ul>${suggestionsList.map(s => `<li>${s}</li>`).join('')}</ul>
  `;
});
