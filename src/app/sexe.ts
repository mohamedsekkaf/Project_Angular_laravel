import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function Sexe(sex: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[sex];

        if (control.errors ) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value ==='Homme'  ) {
            control.setErrors(null);
        } else {
            control.setErrors({ res: true });
        }
    }
}