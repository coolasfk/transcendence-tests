

try {
    const response = await fetch ("some path",
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
})
} catch (error) {
    console.log(error);
}