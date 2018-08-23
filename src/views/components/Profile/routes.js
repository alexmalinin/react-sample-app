import Info from "../../components/Profile/Info/InfoContainer";
import Industry from "../../components/Profile/Industry/IndustryContainer";
import Company from "../../components/Profile/Company/CompanyContainer";
import Billings from "../../components/Profile/Billigns/BillingsContainer";

export const specialistRoutes = [
  {
    name: "profile",
    path: "/profile/info",
    label: "My Profile",
    component: Info
  },
  {
    name: "industry",
    path: "/profile/industry",
    label: "My Services",
    component: Industry
  },
  {
    name: "company",
    path: "/profile/company",
    label: "My Company",
    component: Company
  },
  {
    name: "billing",
    path: "/profile/billings",
    label: "My Billings",
    component: Billings
  }
];

export const clientRoutes = [
  {
    name: "profile",
    path: "/profile/info",
    label: "My Profile",
    component: Info
  },
  {
    name: "company",
    path: "/profile/company",
    label: "My Company",
    component: Company
  },
  {
    name: "billing",
    path: "/profile/billings",
    label: "My Billings",
    component: Billings
  }
];
