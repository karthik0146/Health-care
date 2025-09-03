import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/sidebar/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FeaturesComponent } from './components/features/features.component';
import { CareunitComponent } from './components/careunit/careunit.component';
import { BedsComponent } from './components/beds/beds.component';
import { StafComponent } from './staff/staf.component';
import { FluidsComponent } from './fluids/fluids.component';
import { MedicationsComponent } from './medications/medications.component';
import { HospitalComponent } from './hospital/hospital.component';
import { routeguardGuard } from './components/routeGuard/routeguard.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'features', component: FeaturesComponent, canActivate: [routeguardGuard] },
    { path: 'careunit', component: CareunitComponent , canActivate: [routeguardGuard] },
    { path: 'beds', component: BedsComponent , canActivate: [routeguardGuard] },
    { path: 'staff', component: StafComponent , canActivate: [routeguardGuard] },
    { path: 'fluids', component: FluidsComponent , canActivate: [routeguardGuard] },
    { path: 'medications', component: MedicationsComponent , canActivate: [routeguardGuard] },
    { path: 'hospital', component: HospitalComponent , canActivate: [routeguardGuard] },

    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
