document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    // 2. One-Click PDF Generation Logic
    const downloadBtn = document.getElementById('download-pdf');
    
    downloadBtn.addEventListener('click', () => {
        // Temporarily force light theme for the PDF render
        const originalTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', 'light');
        
        // Select the HTML element you want to convert
        const element = document.getElementById('cv-content');
        
        // Setup options for html2pdf
        const opt = {
            margin:       [0.5, 0.5, 0.5, 0.5], // Top, Left, Bottom, Right margins in inches
            filename:     'Md_Abdullah_Al_Shahab_CV.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true }, // scale 2 improves quality, useCORS helps with images
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Change button text to show loading state
        downloadBtn.innerText = "Generating PDF...";
        downloadBtn.disabled = true;

        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Revert button text
            downloadBtn.innerText = "Generate CV PDF";
            downloadBtn.disabled = false;
            
            // Revert theme back to original
            if (originalTheme !== 'light') {
                document.documentElement.removeAttribute('data-theme');
            }
        });
    });
});