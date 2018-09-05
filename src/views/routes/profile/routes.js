import Info from "@components/Profile/Info";
import Industry from "@components/Profile/Industry";
import Company from "@components/Profile/Company";
import Billings from "@components/Profile/Billigns";

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
