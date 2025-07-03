function convertSnakeToCamel(str: string): string {
    return str.replace(/([-_][a-z])/g, group =>
        group.toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
}

export default convertSnakeToCamel;
