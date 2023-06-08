import { useState } from 'react'
import { ChangeEvent } from 'react'

const ValidateCpf: Function = (event: ChangeEvent<HTMLInputElement>) => {
    const [cpf, setCPF] = useState('');
    const [isValidCPF, setIsValidCPF] = useState(true);
    console.log(cpf, isValidCPF)

    let value = event.target.value;

    // Remove todos os caracteres não numéricos do valor
    value = value.replace(/\D/g, '');

    // Aplica a máscara de CPF
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    setCPF(value);

    // Valida o CPF
    setIsValidCPF(validateCPF(value));
};

const validateCPF = (value: string) => {
    // Remove caracteres não numéricos
    const cleanCPF = value.replace(/\D/g, '');

    if (cleanCPF.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCPF)) {
        return false;
    }

    // Validação dos dígitos verificadores
    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    if (rest !== parseInt(cleanCPF.substring(9, 10))) {
        return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    if (rest !== parseInt(cleanCPF.substring(10, 11))) {
        return false;
    }

    return true;
};

export default ValidateCpf;
