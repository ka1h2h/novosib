async function generate() {
    const fs = require('fs')
    const folderWithSchemes = './schemes/';
    const data = await fs.readdirSync(folderWithSchemes);
    const schemes = {}
    try {
        for (let i = 0; i < data.length; i++) {
            const file = await fs.readFileSync(`${folderWithSchemes}${data[i]}`, { encoding: 'utf8', flag: 'r' });
            const schemeObject = JSON.parse(file)

            if (typeof schemeObject.fields == "undefined") {
                return { scheme: schemeObject.scheme, error: `In Scheme "${schemeObject.scheme}" key[fields] not found `, result: false };
            }

            if (String(typeof schemeObject.views) === 'undefined') {
                schemeObject['views'] = {}
            }

            if (String(typeof schemeObject.views.table) === 'undefined') {
                schemeObject['views']['table'] = {}
                for (const field in schemeObject.fields) {
                    schemeObject['views']['table'][field] = { title: field }
                }
            }

            if (String(typeof schemeObject.views.form) === 'undefined') {

                schemeObject['views']['form'] = {}
                schemeObject['views']['form']['layout'] = 'default'
                schemeObject['views']['form']['zones'] = {}
                schemeObject['views']['form']['zones']['main'] = {}
                schemeObject['views']['form']['zones']['main']['tabs'] = []

                const tabs = {
                    title: "Основное",
                    layout: "default",
                    slots: {
                        main: {

                        }
                    }
                }

                for (const field in schemeObject.fields) {


                    if (Number(String(schemeObject.fields[field].type).indexOf('int')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "number" }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('char')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "string", min: 0, max: schemeObject.fields[field].length }
                        if (String(typeof schemeObject.fields[field].required) !== 'undefined' && schemeObject.fields[field].required !== false) {
                            tabs['slots']['main'][field]['min'] = 1
                            tabs['slots']['main'][field]['required'] = schemeObject.fields[field].required
                        }
                        if (String(typeof schemeObject.fields[field].readOnly) !== undefined) {
                            tabs['slots']['main'][field]['readOnly'] = schemeObject.fields[field].readOnly
                        }
                    }

                    if (Number(String(schemeObject.fields[field].type).indexOf('text')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "text", min: 0, max: schemeObject.fields[field].length }
                        if (String(typeof schemeObject.fields[field].required) !== 'undefined' && schemeObject.fields[field].required !== false) {
                            tabs['slots']['main'][field]['min'] = 1
                            tabs['slots']['main'][field]['required'] = schemeObject.fields[field].required
                        }
                        if (String(typeof schemeObject.fields[field].readOnly) !== undefined) {
                            tabs['slots']['main'][field]['readOnly'] = schemeObject.fields[field].readOnly
                        }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('reference')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "dropdown", ref: schemeObject.fields[field].refTable }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('reference')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "dropdown", ref: schemeObject.fields[field].refTable }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('time')) + 1 > 0 || Number(String(schemeObject.fields[field].type).indexOf('date')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "string" }
                        if (String(typeof schemeObject.fields[field].required) !== 'undefined' && schemeObject.fields[field].required !== false) {
                            tabs['slots']['main'][field]['required'] = schemeObject.fields[field].required
                        }
                        if (String(typeof schemeObject.fields[field].readOnly) !== undefined) {
                            tabs['slots']['main'][field]['readOnly'] = schemeObject.fields[field].readOnly
                        }
                    }
                }
                schemeObject['views']['form']['zones']['main']['tabs'].push(tabs)
            }
            if (String(typeof schemeObject.views.form_add) === 'undefined') {

                schemeObject['views']['form_add'] = {}
                schemeObject['views']['form_add']['layout'] = 'default'
                schemeObject['views']['form_add']['zones'] = {}
                schemeObject['views']['form_add']['zones']['main'] = {}
                schemeObject['views']['form_add']['zones']['main']['tabs'] = []

                const tabs = {
                    title: "Основное",
                    layout: "default",
                    slots: {
                        main: {

                        }
                    }
                }

                for (const field in schemeObject.fields) {


                    if (Number(String(schemeObject.fields[field].type).indexOf('int')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "number" }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('char')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "string", min: 0, max: schemeObject.fields[field].length }
                        if (String(typeof schemeObject.fields[field].required) !== 'undefined' && schemeObject.fields[field].required !== false) {
                            tabs['slots']['main'][field]['min'] = 1
                            tabs['slots']['main'][field]['required'] = schemeObject.fields[field].required
                        }
                        if (String(typeof schemeObject.fields[field].readOnly) !== undefined) {
                            tabs['slots']['main'][field]['readOnly'] = schemeObject.fields[field].readOnly
                        }
                    }

                    if (Number(String(schemeObject.fields[field].type).indexOf('text')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "text", min: 0, max: schemeObject.fields[field].length }
                        if (String(typeof schemeObject.fields[field].required) !== 'undefined' && schemeObject.fields[field].required !== false) {
                            tabs['slots']['main'][field]['min'] = 1
                            tabs['slots']['main'][field]['required'] = schemeObject.fields[field].required
                        }
                        if (String(typeof schemeObject.fields[field].readOnly) !== undefined) {
                            tabs['slots']['main'][field]['readOnly'] = schemeObject.fields[field].readOnly
                        }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('reference')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "dropdown", ref: schemeObject.fields[field].refTable }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('reference')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "dropdown", ref: schemeObject.fields[field].refTable }
                    }
                    if (Number(String(schemeObject.fields[field].type).indexOf('time')) + 1 > 0 || Number(String(schemeObject.fields[field].type).indexOf('date')) + 1 > 0) {
                        tabs['slots']['main'][field] = { title: [field], widget: "string" }
                        if (String(typeof schemeObject.fields[field].required) !== 'undefined' && schemeObject.fields[field].required !== false) {
                            tabs['slots']['main'][field]['required'] = schemeObject.fields[field].required
                        }
                        if (String(typeof schemeObject.fields[field].readOnly) !== undefined) {
                            tabs['slots']['main'][field]['readOnly'] = schemeObject.fields[field].readOnly
                        }
                    }
                }
                schemeObject['views']['form_add']['zones']['main']['tabs'].push(tabs)
            }
            schemes[schemeObject.scheme] = {}
            schemes[schemeObject.scheme]['scheme'] = schemeObject
            schemes[schemeObject.scheme]['routes'] = {
                allTable: { path: `/${schemeObject.scheme}` },
                table: { path: `/${schemeObject.scheme}/:id` },
                edit: { path: `/${schemeObject.scheme}/:id/edit` },
                add: { path: `/${schemeObject.scheme}/:id/add` },
                add_file: { path: `/${schemeObject.scheme}/:id/add/file` },
                add_folder: { path: `/${schemeObject.scheme}/:id/add/folder` },
            }
        }
        console.log("\x1b[32m", 'Все схемы успешно сгенерированы');
    } catch (e) {
        console.log("\x1b[31m", e);
    }

    await fs.writeFileSync('allSchemes.json', JSON.stringify(schemes))
}
generate();