export async function getAllPantries() {
    try {
        const res = await fetch("/api/pantries")
        if (!res.ok) 
            throw new Error(res.status);
        return await res.json();
    } catch (err) {
        console.log("ERROR: getAllPantries(): " + err);
        return null;
    }
}
