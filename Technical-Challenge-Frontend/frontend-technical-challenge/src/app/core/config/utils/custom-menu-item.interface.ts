import { MenuItem } from 'primeng/api';

export interface CustomMenuItem extends MenuItem {
    allowedRoles: string[]; 
}