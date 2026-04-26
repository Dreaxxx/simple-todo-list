export function formatDate(date: string | null) {
    if (!date) {
        return "Non renseignee";
    }

    return new Date(date).toLocaleDateString("fr-FR");
}