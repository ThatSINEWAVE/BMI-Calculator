function calculateBMI() {
    const age = document.getElementById('age').value;
    let height = document.getElementById('height').value;
    let weight = document.getElementById('weight').value;
    const heightUnit = document.getElementById('height-unit').value;
    const weightUnit = document.getElementById('weight-unit').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (heightUnit === 'in') {
        height = height * 2.54; // convert inches to cm
    }
    if (weightUnit === 'lb') {
        weight = weight * 0.453592; // convert pounds to kg
    }

    height = height / 100; // convert cm to meters

    const bmi = weight / (height * height);
    const bmiValue = bmi.toFixed(1);

    const indicator = document.getElementById('bmi-indicator');
    const bmiResult = document.getElementById('bmi-value');

    bmiResult.textContent = bmiValue;

    let bmiCategory;
    if (bmi < 17.1) {
        indicator.style.left = `${(bmi / 17.1) * 33.33}%`;
        bmiCategory = "Underweight 10 BMI - 17.1 BMI";
    } else if (bmi < 23.1) {
        indicator.style.left = `${33.33 + ((bmi - 17.1) / (23.1 - 17.1)) * 33.33}%`;
        bmiCategory = "Normal 17.1 BMI - 23.2 BMI";
    } else {
        indicator.style.left = `${66.66 + ((bmi - 23.1) / (38 - 23.1)) * 33.33}%`;
        bmiCategory = "Overweight 23.2 BMI - 38 BMI";
    }

    let message = `Your BMI is ${bmiValue}<br>(${bmiCategory})`;
    if (gender === 'male') {
        if (bmi < 17.1) {
            message += "<br>Consider gaining weight.";
        } else if (bmi < 23.2) {
            message += "<br>You are in a healthy weight range.";
        } else {
            message += "<br>Consider losing weight.";
        }
    } else if (gender === 'female') {
        if (bmi < 17.1) {
            message += "<br>Consider gaining weight.";
        } else if (bmi < 23.2) {
            message += "<br>You are in a healthy weight range.";
        } else {
            message += "<br>Consider losing weight.";
        }
    }

    bmiResult.innerHTML = message;
}

// Get the theme toggle input element
const themeToggle = document.getElementById('theme-toggle');

// Get the body element
const body = document.body;

// Function to set the theme
function setTheme(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-theme');
        themeToggle.checked = false;
    }
}

// Load the saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');

// Save the theme when the toggle is clicked
themeToggle.addEventListener('change', () => {
    const isDarkMode = themeToggle.checked;
    setTheme(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});