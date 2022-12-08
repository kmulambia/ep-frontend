export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
};

export const componentKey = (key) => {
    return Math.random() + key;
};