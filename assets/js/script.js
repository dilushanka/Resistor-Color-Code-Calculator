const colors = [
    { name: "Black", value: 0, multiplier: 1 },
    { name: "Brown", value: 1, multiplier: 10, tolerance: "±1%", hex: "#964b00" },
    { name: "Red", value: 2, multiplier: 100, tolerance: "±2%" },
    { name: "Orange", value: 3, multiplier: 1000 },
    { name: "Yellow", value: 4, multiplier: 10000 },
    { name: "Green", value: 5, multiplier: 100000, tolerance: "±0.5%" },
    { name: "Blue", value: 6, multiplier: 1000000, tolerance: "±0.25%" },
    { name: "Violet", value: 7, multiplier: 10000000, tolerance: "±0.1%" },
    { name: "Gray", value: 8, multiplier: 0.1, tolerance: "±0.05%" },
    { name: "White", value: 9, multiplier: 0.01 },
    { name: "Gold", multiplier: 0.1, tolerance: "±5%" },
    { name: "Silver", multiplier: 0.01, tolerance: "±10%" },
  ];
  
  function populateSelectors() {
    const selectors = ["band1-color", "band2-color", "band3-color", "band4-color"];
    selectors.forEach(id => {
      const select = document.getElementById(id);
      colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color.name;
        option.textContent = color.name;
        option.style.background = color.name.toLowerCase();
        option.style.color = color.name.toLowerCase() === "black" ? "white" : "black"; // Adjust contrast for readability
        select.appendChild(option);
      });
    });
  }
  
  function calculateResistance() {
    const band1 = colors.find(c => c.name === document.getElementById("band1-color").value);
    const band2 = colors.find(c => c.name === document.getElementById("band2-color").value);
    const band3 = colors.find(c => c.name === document.getElementById("band3-color").value);
    const band4 = colors.find(c => c.name === document.getElementById("band4-color").value);
  
    const resistance = (band1.value * 10 + band2.value) * band3.multiplier;
    const tolerance = band4?.tolerance || "±20%"; // Default tolerance if not selected
  
    // Update result text
    document.getElementById("result").textContent = `Resistance: ${resistance} Ω ${tolerance}`;
  
    // Update band colors in the preview
    document.getElementById("band1-preview").style.background = band1.name.toLowerCase();
    document.getElementById("band2-preview").style.background = band2.name.toLowerCase();
    document.getElementById("band3-preview").style.background = band3.name.toLowerCase();
    document.getElementById("band4-preview").style.background = band4?.name.toLowerCase() || "gray";
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    populateSelectors();
    document.querySelectorAll("select").forEach(select => {
      select.addEventListener("change", calculateResistance);
    });
  });
  