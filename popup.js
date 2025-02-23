document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                const h1 = document.querySelector("h1");
                const linkElement = document.querySelector("a[data-target='#diffs']");
                const linkText = linkElement ? linkElement.href : "";
                return h1 ? `${h1.innerText}\n\n${linkText}` : "";
            }
        }, (results) => {
            if (results && results[0] && results[0].result) {
                document.getElementById("h1Text").value = results[0].result;
            }
        });
    });

    document.getElementById("copyButton").addEventListener("click", () => {
        const input = document.getElementById("h1Text");
        input.select();
        navigator.clipboard.writeText(input.value).then(() => {
            console.log("Text copied to clipboard");
        }).catch(err => console.error("Error copying text: ", err));
    });
});