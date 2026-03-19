export default async function fetchExercisesFromRapid() {
  const res = await fetch("https://exercisedb.p.rapidapi.com/exercises", {
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.EXERCISES_API_KEY!,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
    next: { revalidate: 86400 }
  })
  if (!res.ok) throw new Error("Error: Could not fetch data from RapidAPI")

  return res.json();
}