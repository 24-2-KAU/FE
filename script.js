document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('script-form');
    const resultContainer = document.getElementById('script-result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const channelId = document.getElementById('channelId').value;
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const targetAge = parseInt(document.getElementById('targetAge').value, 10);
        const targetGender = document.getElementById('targetGender').value;
        const hashtags = document.getElementById('hashtags').value;

        const url = `https://adinfluencerai.click/create_script/${channelId}`;
        const payload = {
            productName,
            prodcutDescription: productDescription, // Typo in key preserved intentionally as per provided structure
            productPrice,
            target_age: targetAge,
            target_gender: targetGender,
            hashtags
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                resultContainer.textContent = data.script || 'No script returned.';
            } else {
                resultContainer.textContent = `Error: ${response.statusText}`;
            }
        } catch (error) {
            resultContainer.textContent = `Error: ${error.message}`;
        }
    });
});
