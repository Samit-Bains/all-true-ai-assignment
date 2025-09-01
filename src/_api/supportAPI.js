export async function fetchYesNoAPI() {
    const response = await fetch("https://yesno.wtf/api");
    if (!response.ok) {
        throw new Error("Failed to fetch yes/no response");
    }
    return response.json();
}