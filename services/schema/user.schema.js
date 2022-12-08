import * as yup from 'yup';


export function UserRegistrationSchema(t) {
    return (() => yup.object().shape({
        username: yup
            .string()
            .matches(/^[A-Za-z ]+$/, t('forms.fields.invalid', { ns: 'common' }))
            .required(t('forms.fields.required', { ns: 'common' })),
        phone: yup
            .string()
            .matches(
                /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                {
                    message: t('forms.fields.invalid', { ns: 'common' }),
                    excludeEmptyString: false,
                }
            )
            .required(t('forms.fields.required', { ns: 'common' })),
        email: yup.string().required(t('forms.fields.required', { ns: 'common' })).email(t('forms.fields.invalid', { ns: 'common' })),
        password: yup.string().required(t('forms.fields.required', { ns: 'common' })).min(8),
        confirmPassword: yup
            .string()
            .nullable()
            .notRequired()
            .oneOf([yup.ref("password")], t('forms.fields.password_mismatch', { ns: 'common' })),
        status: yup.bool().default(false),
        roleId: yup.string().required(t('forms.fields.select_one', { ns: 'common' })),
    }))
}


export function UserProfileSchema(t) {
    return (() => yup.object().shape({
        username: yup
            .string()
            .matches(/^[A-Za-z ]+$/, t('forms.fields.invalid', { ns: 'common' }))
            .required(t('forms.fields.required', { ns: 'common' })),
        phone: yup
            .string()
            .matches(
                /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                {
                    message: t('forms.fields.invalid', { ns: 'common' }),
                    excludeEmptyString: false,
                }
            )
            .required(t('forms.fields.required', { ns: 'common' })),
        email: yup.string().required(t('forms.fields.required', { ns: 'common' })).email(t('forms.fields.invalid', { ns: 'common' })),
    }))
}


export function UserSecuritySchema(t) {
    return (() => yup.object().shape({
        roleId: yup.string().required(t('forms.fields.select_one', { ns: 'common' })),
        status: yup.bool().required(t('forms.fields.select_one', { ns: 'common' })),
    }))
}

export function RemoveUserSchema(t) {
    return (() => yup.object().shape({
        email: yup.string().required(t('forms.fields.required', { ns: 'common' })).email(t('forms.fields.invalid', { ns: 'common' })),
        confirmEmail: yup
            .string()
            .required(t('forms.fields.required', { ns: 'common' }))
            .oneOf([yup.ref("email")], t('forms.fields.input_mismatch', { ns: 'common' })),
    }))

}

export function ChangePasswordSchema(t) {
    return (() => yup.object().shape({
        password: yup.string().required("filed is required").min(8),
        confirmPassword: yup
            .string()
            .required(t('forms.fields.required', { ns: 'common' }))
            .oneOf([yup.ref("password")], "passwords do not match"),
    }))

}