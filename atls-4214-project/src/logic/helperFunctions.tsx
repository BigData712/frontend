export function toTitleCase(input: String):String {
        return (
            input // Replace underscores with spaces
                .split(' ') //split on spaces
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //capitalize first letter
                .join(' ') //combine strings
        );
}