const form = document.getElementById("signupForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
  };

  // Basic client-side validation
  if (userData.password.length < 8) {
    showMessage("Password must be at least 8 characters.", "error");
    return;
  }

  setLoading(true);
  hideMessage();

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed. Please try again.");
    }

    showMessage("🎉 Account created successfully!", "success");
    form.reset();
  } catch (err) {
    showMessage(err.message, "error");
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.querySelector(".btn-text").textContent = isLoading ? "Creating account…" : "Sign Up";
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
  message.hidden = false;
}

function hideMessage() {
  message.hidden = true;
}
