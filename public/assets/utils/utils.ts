export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
        const fileName = files[0].name;
        document.getElementById("file-name")!.textContent = fileName;
    }
};