export default function createZone(Scheme, method) {
    let SchemeFormTabs = {};
    let SchemeData = {};

    if (String(typeof Scheme.form_edit) === 'undefined' && String(typeof Scheme.form_add) === 'undefined') {
        Scheme = Scheme.form
        SchemeFormTabs = Scheme.zones
    }
    if (String(typeof Scheme.form_edit) !== 'undefined' && method === 'edit') {
        Scheme = Scheme.form_edit
        SchemeFormTabs = Scheme.zones
    }
    if (String(typeof Scheme.form_add) !== 'undefined' && method === 'add') {
        Scheme = Scheme.form_add
        SchemeFormTabs = Scheme.zones
    }

    for (const zoneName in Scheme.zones) {
        Scheme.zones[zoneName].tabs.forEach(element => {
            for (const slotName in element.slots) {
                for (const nameField in element.slots[slotName]) {
                    SchemeData[nameField] = element.slots[slotName][nameField]
                }
            }
        });
    }

    return {
        SchemeFormTabs,
        SchemeData
    }
} 
