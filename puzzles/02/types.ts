export type PasswordWithSledPolicy = {
    password: string;
    policy: {
        character: string;
        min: number;
        max: number;
    }
};

export type PasswordWithTobogganPolicy = {
    password: string;
    policy: {
        character: string;
        indexA: number;
        indexB: number;
    }
};