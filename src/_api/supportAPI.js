export async function fetchYesNoAPI() {
    const response = await fetch("https://yesno.wtf/api");
    if (!response.ok) {
        // This will be the error message in the rejected case
        throw new Error("Failed to fetch yes/no response");
    }
    return response.json();
}

export async function fetchRandomJokeAPI() {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!response.ok) {
        // This will be the error message in the rejected case
        throw new Error("Failed to fetch joke");
    }
    return response.json();
}