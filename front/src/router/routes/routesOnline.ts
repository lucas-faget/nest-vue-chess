function generateAlphanumericString(length: number) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const routesOnline = [
    {
        path: '/room',
        text: 'Standard',
        redirect: () => {
            const roomId = generateAlphanumericString(8);
            return `/${roomId}`;
        },
    },
];
