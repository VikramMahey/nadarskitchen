export function setupContactForm() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwJUTzbBzHCL-aQJsqXlf24eLEYQ3e3-D8FAy-d2lbHV49eV2rSAC93risNoN7J91okCQ/exec";
    const form = document.getElementById("ContactForm");

    if (!form) return; // ✅ Skip if form not present

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            message: form.message.value,
        };

        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors", // ✅ required for Google Apps Script
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(() => {
                alert("✅ Thank you! Your message has been sent.");
                form.reset();
            })
            .catch((error) => {
                console.error("❌ Error!", error);
                alert("Something went wrong.");
            });
    });
}
