import Category from "./Category";

const categories: Category[] = [
  {
    category: "Abundance",
    props: [
      { name: "Abundance in Earth crust", property: (v) => v.abundanceCrust },
      { name: "Abundance in Sea", property: (v) => v.abundanceSea },
    ],
  },
  {
    category: "Radius",
    props: [
      { name: "Atomic Radius", property: (v) => v.atomicRadius },
      { name: "Van der waals Radius", property: (v) => v.vdwRadius },
      { name: "Covalent Radius", property: (v) => v.covalentRadius },
    ],
  },
  {
    category: "Count",
    props: [
      { name: "Electrons Count", property: (v) => v.electrons },
      {
        name: "Outermost Electrons Count",
        property: (v) => v.shells[v.shells.length - 1],
      },
      { name: "Protons Count", property: (v) => v.protons },
      { name: "Neutrons Count", property: (v) => v.neutrons },
    ],
  },
  {
    category: "Atomic properties",
    props: [
      { name: "Atomic Volume", property: (v) => v.atomicVolume },
      { name: "Atomic Weight", property: (v) => v.atomicWeight },
      { name: "Density", property: (v) => v.density },
      { name: "Boiling Point", property: (v) => v.boilingPoint },
      { name: "Melting Point", property: (v) => v.meltingPoint },
      {
        name: "Electronegativity (Pauling)",
        property: (v) => v.electronegativity,
      },
      { name: "Evaporation Heat", property: (v) => v.evaporationHeat },
      { name: "Fusion Heat", property: (v) => v.fusionHeat },
      { name: "First ionization energy", property: (v) => v.ionEnergy },
      { name: "Mass Number", property: (v) => v.massNumber },
      { name: "Group", property: (v) => v.group },
      { name: "Period", property: (v) => v.period },
    ],
  },
];

export default categories;
