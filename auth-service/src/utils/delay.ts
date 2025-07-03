/**
 * Function used to delay for some seconds
 * @param ms Millisecond time to delay any functionality.
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
