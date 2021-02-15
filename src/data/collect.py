from mendeleev import element
import json

result = []
additional_data = []
with open('./additional.json', 'r') as fp:
    additional_data = json.load(fp)

for n in range(1, 119):
    el = element(n)
    data = {
        'name': el.name,
        'symbol': el.symbol,
        'number': el.atomic_number,
        'group': el.group_id,
        'period': el.period,
        'abundanceCrust': el.abundance_crust,  # mg/kg
        'abundanceSea': el.abundance_sea,  # mg/L
        'atomicRadius': el.atomic_radius,  # pm
        'vdwRadius': el.vdw_radius,  # pm
        'covalentRadius': el.covalent_radius_pyykko,  # pm
        'atomicVolume': el.atomic_volume,  # cm3/mol
        'atomicWeight': el.atomic_weight,
        'block': el.block,
        'boilingPoint': el.boiling_point,  # K
        'meltingPoint': el.melting_point,  # K
        'discoveryYear': el.discovery_year,
        'electrons': el.electrons,
        'electronegativity': el.en_pauling,
        'evaporationHeat': el.evaporation_heat,  # kJ/mol
        'fusionHeat': el.fusion_heat,  # kJ/mol
        # eV, 1st ionazation energy
        'ionEnergy': el.ionenergies[1] if 1 in el.ionenergies else None,
        'structure': el.lattice_structure,
        'massNumber': el.mass_number,  # most abundant
        'neutrons': el.neutrons,
        'protons': el.protons,
    }

    # additional data : density (g/L, at STP)

    data = {k: v for k, v in data.items() if v is not None}
    for k, v in additional_data[n-1].items():
        data[k] = v

    result.append(data)


with open('data.json', 'w') as fp:
    json.dump(result, fp, ensure_ascii=False)
