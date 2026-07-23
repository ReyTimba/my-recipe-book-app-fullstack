import type { Recipe } from "./recipe";

const TS = "2026-07-23T12:00:00.000Z";

function rId(r: string): string { return "receta-" + r; }
function rIng(r: string, n: number): string { return "ing-" + r + "-" + n; }
function rStep(r: string, n: number): string { return "step-" + r + "-" + n; }
function rUnc(r: string, f: string): string { return "unc-" + r + "-" + f; }
function rSec(r: string, s: string): string { return "sec-" + r + "-" + s; }
function rRef(r: string, n: number): string { return "ref-" + r + "-" + n; }

function img(label: string) {
  return { id: "src-" + label.replace(/[^a-zA-Z0-9]/g, "-"), kind: "image" as const, label };
}

/**
 * Devuelve las 55 recetas precargadas extraídas de recetas_extraidas.md
 * convertidas al modelo Recipe v2.
 */
const CATEGORIA_RECETA: Record<string, string[]> = {
  "pure-frio-de-apio-nabo":     ["Guarnición"],
  "tiramisu":                   ["Postre"],
  "crema-nata-acida":           ["Salsa"],
  "medovik-masa":               ["Masa"],
  "lingote-de-chocolate":       ["Postre"],
  "volcan-de-chocolate":        ["Postre"],
  "salsa-para-torrijas":        ["Salsa"],
  "coulis-de-frambuesa":        ["Salsa"],
  "salsa-baileys":              ["Salsa"],
  "salsa-nutella":              ["Salsa"],
  "carbonara-parmesano":        ["Salsa"],
  "ajoaceite":                  ["Salsa"],
  "crema-de-pecorino":          ["Salsa"],
  "salsa-steak-tartar":         ["Salsa"],
  "salsa-costillas":            ["Salsa"],
  "chimichurri":                ["Salsa"],
  "emulsion-de-piparra":        ["Salsa"],
  "guacamole":                  ["Salsa"],
  "guacamole-de-papaya":        ["Salsa"],
  "honey-lime-vinagreta-apio":  ["Salsa"],
  "coulis-verde-estable":       ["Salsa"],
  "leche-de-tigre":             ["Salsa"],
  "aceite-de-hierbabuena":      ["Salsa"],
  "goulash":                    ["Carne"],
  "receta-miso":                ["Salsa"],
  "babaganoush":                ["Guarnición"],
  "berenjena-al-horno":         ["Guarnición"],
  "picadito-berenjena":         ["Guarnición"],
  "tempura-sifon":              ["Masa"],
  "cebolla-encurtida":          ["Guarnición"],
  "espuma-de-gorgonzola":       ["Salsa"],
  "espuma-de-patata":           ["Guarnición"],
  "cebolla-caramelizada":       ["Guarnición"],
  "scrippelle":                 ["Masa"],
  "besciamella":                ["Salsa"],
  "puerro-pecorino-yema-shiitake":["Arroz-Pasta"],
  "pulpo":                      ["Pescado"],
  "salmon-marinado":            ["Pescado"],
  "caldo-de-pescado":           ["Pescado"],
  "salsa-de-tomate-casera":     ["Salsa"],
  "salsa-alla-puttanesca":      ["Salsa"],
  "salsa-tonnata":              ["Salsa"],
  "crema-de-yema-grasa":        ["Salsa"],
  "pere-en-sirope":             ["Postre"],
  "sarde-in-saor":              ["Pescado"],
  "albondigas-cacio-e-ove":     ["Carne"],
  "mayonesa-naranja":           ["Salsa"],
  "mostaza-x-pastrami":         ["Salsa"],
  "bunuelos-de-parmesano":      ["Masa"],
  "pastrami-salmuera-rub":      ["Carne"],
  "ensaladilla-rusa":           ["Guarnición"],
  "titaina-del-cabanal":        ["Guarnición"],
  "fresas-crema-mascarpone":    ["Postre"],
  "caponata":                   ["Guarnición"],
  "gravlax-de-bonito":          ["Pescado"],
};

export function obtenerRecetasCargadas(): Recipe[] {
  const raw: Recipe[] = [
        {
          schemaVersion: 2,
          id: rId("pure-frio-de-apio-nabo"),
          name: "Puré frío de apio nabo (al vacío + vapor)",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("pfn",1),
              amount: "1",
              unit: "kg",
              name: "apio nabo",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("pfn",2),
              amount: "¼–½",
              unit: "",
              name: "chalota",
              quantity: {
                kind: "range",
                originalText: "¼–½",
                min: 0.25,
                max: 0.5
              }
            },
            {
              id: rIng("pfn",3),
              amount: "10–15",
              unit: "g",
              name: "mantequilla",
              quantity: {
                kind: "range",
                originalText: "10–15 g",
                min: 10,
                max: 15,
                unit: "g"
              }
            },
            {
              id: rIng("pfn",4),
              amount: "",
              unit: "",
              name: "sal fina",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("pfn",5),
              amount: "",
              unit: "",
              name: "pimienta blanca",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("pfn",6),
              amount: "",
              unit: "",
              name: "agua",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "la necesaria"
              }
            }
          ],
          steps: [
            {
              id: rStep("pfn",1),
              text: "cortar el apio nabo en dados medianos y la chalota fina",
              status: "complete"
            },
            {
              id: rStep("pfn",2),
              text: "envasar al vacío con mantequilla y sal ligera",
              status: "complete",
              equipment: [
                "envasadora al vacío"
              ]
            },
            {
              id: rStep("pfn",3),
              text: "cocer al vapor 95–100 °C, 30 min, hasta muy tierno",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "30 min",
                minutes: 30
              },
              temperature: {
                kind: "range",
                originalText: "95–100 °C",
                min: 95,
                max: 100,
                unit: "C"
              }
            },
            {
              id: rStep("pfn",4),
              text: "abrir y triturar en caliente con su jugo",
              status: "complete"
            },
            {
              id: rStep("pfn",5),
              text: "ajustar con agua caliente hasta crema napante, sal y pimienta",
              status: "complete"
            },
            {
              id: rStep("pfn",6),
              text: "colar fino, enfriar rápido y reservar en frío",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782341.jpg")
          ],
          uncertainties: [],
          tags: ["Crema","Frío","Verdura","Guarnición"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("tiramisu"),
          name: "Tiramisú",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("tira",1),
              amount: "150",
              unit: "gr",
              name: "yema",
              quantity: {
                kind: "exact",
                originalText: "150 gr",
                value: 150,
                unit: "gr"
              }
            },
            {
              id: rIng("tira",2),
              amount: "7 y ½",
              unit: "cucharas",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "7 y ½ cucharas",
                value: 7.5,
                unit: "cucharas"
              }
            },
            {
              id: rIng("tira",3),
              amount: "260",
              unit: "gr",
              name: "clara",
              quantity: {
                kind: "exact",
                originalText: "260 gr",
                value: 260,
                unit: "gr"
              }
            },
            {
              id: rIng("tira",4),
              amount: "750",
              unit: "gr",
              name: "mascarpone",
              quantity: {
                kind: "exact",
                originalText: "750 gr",
                value: 750,
                unit: "gr"
              }
            },
            {
              id: rIng("tira",5),
              amount: "",
              unit: "",
              name: "savoiardi",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [
            {
              id: rStep("tira",1),
              text: "montar la yema con el azúcar y guardar en un bol",
              status: "complete"
            },
            {
              id: rStep("tira",2),
              text: "montar a nieve la clara",
              status: "complete"
            },
            {
              id: rStep("tira",3),
              text: "mezclar toda la crema",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782352.jpg")
          ],
          uncertainties: [],
          tags: ["Postre","Dulce","Italiano"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("crema-nata-acida"),
          name: "Crema (nata ácida)",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("cna",1),
              amount: "1.5",
              unit: "L",
              name: "nata (fría)",
              quantity: {
                kind: "exact",
                originalText: "1.5 L",
                value: 1.5,
                unit: "L"
              }
            },
            {
              id: rIng("cna",2),
              amount: "150",
              unit: "g",
              name: "zumo de limón",
              quantity: {
                kind: "exact",
                originalText: "150 g",
                value: 150,
                unit: "g"
              }
            },
            {
              id: rIng("cna",3),
              amount: "150",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "150 g",
                value: 150,
                unit: "g"
              }
            }
          ],
          steps: [
            {
              id: rStep("cna",1),
              text: "mezclar nata, limón y azúcar",
              status: "complete"
            },
            {
              id: rStep("cna",2),
              text: "batir ligeramente hasta que quede cremosa pero fluida",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782361.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Preparación base","Dulce"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("medovik-masa"),
          name: "Medovik — masa",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("med",1),
              amount: "500",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "500 g",
                value: 500,
                unit: "g"
              }
            },
            {
              id: rIng("med",2),
              amount: "120",
              unit: "g",
              name: "miel",
              quantity: {
                kind: "exact",
                originalText: "120 g",
                value: 120,
                unit: "g"
              }
            },
            {
              id: rIng("med",3),
              amount: "150",
              unit: "g",
              name: "mantequilla",
              quantity: {
                kind: "exact",
                originalText: "150 g",
                value: 150,
                unit: "g"
              }
            },
            {
              id: rIng("med",4),
              amount: "200",
              unit: "g",
              name: "huevos (4 ud)",
              quantity: {
                kind: "exact",
                originalText: "200 g (4 ud)",
                value: 200,
                unit: "g"
              }
            },
            {
              id: rIng("med",5),
              amount: "2",
              unit: "g",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "2 g",
                value: 2,
                unit: "g"
              }
            },
            {
              id: rIng("med",6),
              amount: "50",
              unit: "g",
              name: "bicarbonato",
              quantity: {
                kind: "exact",
                originalText: "50 g",
                value: 50,
                unit: "g"
              }
            },
            {
              id: rIng("med",7),
              amount: "500",
              unit: "g",
              name: "harina",
              quantity: {
                kind: "exact",
                originalText: "500 g",
                value: 500,
                unit: "g"
              }
            }
          ],
          steps: [
            {
              id: rStep("med",1),
              text: "al baño María mezclar azúcar, miel, mantequilla y sal",
              status: "complete",
              equipment: [
                "baño María"
              ]
            },
            {
              id: rStep("med",2),
              text: "incorporar los huevos poco a poco",
              status: "complete"
            },
            {
              id: rStep("med",3),
              text: "añadir bicarbonato y mantener 1–2 min más",
              status: "complete",
              time: {
                kind: "range",
                originalText: "1–2 min",
                minMinutes: 1,
                maxMinutes: 2
              }
            },
            {
              id: rStep("med",4),
              text: "retirar, añadir harina y mezclar",
              status: "complete"
            },
            {
              id: rStep("med",5),
              text: "estirar láminas de 2–3 mm",
              status: "complete"
            },
            {
              id: rStep("med",6),
              text: "hornear a 180 °C durante 6–7 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "6–7 min",
                minMinutes: 6,
                maxMinutes: 7
              },
              temperature: {
                kind: "exact",
                originalText: "180 °C",
                value: 180,
                unit: "C"
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782369.jpg")
          ],
          uncertainties: [],
          tags: ["Masa","Panadería","Postre","Dulce"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("lingote-de-chocolate"),
          name: "Lingote de chocolate",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: 20,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("lc",1),
              amount: "265",
              unit: "g",
              name: "nata",
              quantity: {
                kind: "exact",
                originalText: "265 g",
                value: 265,
                unit: "g"
              }
            },
            {
              id: rIng("lc",2),
              amount: "33",
              unit: "g",
              name: "yema",
              quantity: {
                kind: "exact",
                originalText: "33 g",
                value: 33,
                unit: "g"
              }
            },
            {
              id: rIng("lc",3),
              amount: "3",
              unit: "g",
              name: "gelatina",
              quantity: {
                kind: "exact",
                originalText: "3 g",
                value: 3,
                unit: "g"
              }
            },
            {
              id: rIng("lc",4),
              amount: "17",
              unit: "g",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "17 g",
                value: 17,
                unit: "g"
              }
            },
            {
              id: rIng("lc",5),
              amount: "133",
              unit: "g",
              name: "chocolate",
              quantity: {
                kind: "exact",
                originalText: "133 g",
                value: 133,
                unit: "g"
              }
            },
            {
              id: rIng("lc",6),
              amount: "4",
              unit: "ud",
              name: "yema",
              quantity: {
                kind: "exact",
                originalText: "4 ud",
                value: 4,
                unit: "ud"
              }
            },
            {
              id: rIng("lc",7),
              amount: "4",
              unit: "ud",
              name: "clara",
              quantity: {
                kind: "exact",
                originalText: "4 ud",
                value: 4,
                unit: "ud"
              }
            },
            {
              id: rIng("lc",8),
              amount: "50",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "50 g",
                value: 50,
                unit: "g"
              }
            },
            {
              id: rIng("lc",9),
              amount: "165",
              unit: "g",
              name: "chocolate",
              quantity: {
                kind: "exact",
                originalText: "165 g",
                value: 165,
                unit: "g"
              }
            },
            {
              id: rIng("lc",10),
              amount: "130",
              unit: "g",
              name: "aceite e.v. oliva",
              quantity: {
                kind: "exact",
                originalText: "130 g",
                value: 130,
                unit: "g"
              }
            },
            {
              id: rIng("lc",11),
              amount: "150",
              unit: "g",
              name: "azúcar moreno",
              quantity: {
                kind: "exact",
                originalText: "150 g",
                value: 150,
                unit: "g"
              }
            },
            {
              id: rIng("lc",12),
              amount: "35",
              unit: "g",
              name: "harina de almendra",
              quantity: {
                kind: "exact",
                originalText: "35 g",
                value: 35,
                unit: "g"
              }
            },
            {
              id: rIng("lc",13),
              amount: "",
              unit: "",
              name: "ralladura de 1 limón",
              quantity: {
                kind: "exact",
                originalText: "ralladura de 1 limón"
              }
            }
          ],
          steps: [
            {
              id: rStep("lc",1),
              text: "para la ganache, hervir nata con yema, añadir gelatina ya blanda y mezclar con chocolate fundido",
              status: "complete"
            },
            {
              id: rStep("lc",2),
              text: "para el lingote, montar claras con azúcar",
              status: "complete"
            },
            {
              id: rStep("lc",3),
              text: "añadir yema al chocolate, aceite, azúcar moreno, harina de almendra y ralladura",
              status: "complete"
            },
            {
              id: rStep("lc",4),
              text: "cocción: 185 °C, 20 min",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "20 min",
                minutes: 20
              },
              temperature: {
                kind: "exact",
                originalText: "185 °C",
                value: 185,
                unit: "C"
              }
            }
          ],
          preparationStatus: "complete",
          sections: [
            {
              id: rSec("lc","ganache"),
              title: "Ganache",
              kind: "component",
              ingredients: [],
              steps: [
                {
                  id: rStep("lc-sg",1),
                  text: "hervir nata con yema, añadir gelatina ya blanda y mezclar con chocolate fundido",
                  status: "complete"
                }
              ],
              referenceIds: []
            },
            {
              id: rSec("lc","lingote"),
              title: "Lingote",
              kind: "component",
              ingredients: [],
              steps: [
                {
                  id: rStep("lc-sl",1),
                  text: "montar claras con azúcar; añadir yema, chocolate, aceite, azúcar moreno, harina de almendra y ralladura",
                  status: "complete"
                },
                {
                  id: rStep("lc-sl",2),
                  text: "cocción: 185 °C, 20 min",
                  status: "complete"
                }
              ],
              referenceIds: []
            }
          ],
          references: [],
          sources: [
            img("1777285782527.jpg")
          ],
          uncertainties: [],
          tags: ["Postre","Dulce","Chocolate"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("volcan-de-chocolate"),
          name: "Volcán de chocolate (x3)",
          description: "",
          servings: 3,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "servings",
            originalText: "x3",
            amount: 3,
            unit: "porciones",
            state: "known"
          },
          ingredients: [
            {
              id: rIng("vc",1),
              amount: "600",
              unit: "g",
              name: "chocolate",
              quantity: {
                kind: "exact",
                originalText: "600 g",
                value: 600,
                unit: "g"
              }
            },
            {
              id: rIng("vc",2),
              amount: "660",
              unit: "g",
              name: "mantequilla",
              quantity: {
                kind: "exact",
                originalText: "660 g",
                value: 660,
                unit: "g"
              }
            },
            {
              id: rIng("vc",3),
              amount: "12",
              unit: "",
              name: "huevos",
              quantity: {
                kind: "exact",
                originalText: "12",
                value: 12
              }
            },
            {
              id: rIng("vc",4),
              amount: "540",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "540 g",
                value: 540,
                unit: "g"
              }
            },
            {
              id: rIng("vc",5),
              amount: "420",
              unit: "g",
              name: "harina",
              quantity: {
                kind: "exact",
                originalText: "420 g",
                value: 420,
                unit: "g"
              }
            }
          ],
          steps: [
            {
              id: rStep("vc",1),
              text: "derretir chocolate y mantequilla al baño María",
              status: "complete",
              equipment: [
                "baño María"
              ]
            },
            {
              id: rStep("vc",2),
              text: "montar huevos con azúcar",
              status: "complete"
            },
            {
              id: rStep("vc",3),
              text: "mezclar con el chocolate e incorporar harina tamizada",
              status: "complete"
            },
            {
              id: rStep("vc",4),
              text: "preparar vasitos de 80/90 g cada uno",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782540.jpg")
          ],
          uncertainties: [],
          tags: ["Postre","Dulce","Chocolate"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-para-torrijas"),
          name: "Salsa para torrijas con pan brioche",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "volume",
            originalText: "aprox. 500 ml de salsa infusionada",
            amount: 500,
            unit: "ml",
            state: "approximate"
          },
          ingredients: [
            {
              id: rIng("spt",1),
              amount: "500",
              unit: "ml",
              name: "nata",
              quantity: {
                kind: "exact",
                originalText: "500 ml",
                value: 500,
                unit: "ml"
              }
            },
            {
              id: rIng("spt",2),
              amount: "1",
              unit: "L",
              name: "leche",
              quantity: {
                kind: "exact",
                originalText: "1 L",
                value: 1,
                unit: "L"
              }
            },
            {
              id: rIng("spt",3),
              amount: "500",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "500 g",
                value: 500,
                unit: "g"
              }
            },
            {
              id: rIng("spt",4),
              amount: "",
              unit: "",
              name: "corteza de 1 limón",
              quantity: {
                kind: "exact",
                originalText: "corteza de 1 limón"
              }
            },
            {
              id: rIng("spt",5),
              amount: "",
              unit: "",
              name: "corteza de 1 naranja",
              quantity: {
                kind: "exact",
                originalText: "corteza de 1 naranja"
              }
            },
            {
              id: rIng("spt",6),
              amount: "2",
              unit: "ramas",
              name: "canela",
              quantity: {
                kind: "exact",
                originalText: "2 ramas",
                value: 2,
                unit: "ramas"
              }
            },
            {
              id: rIng("spt",7),
              amount: "5",
              unit: "",
              name: "huevos",
              quantity: {
                kind: "exact",
                originalText: "5",
                value: 5
              }
            },
            {
              id: rIng("spt",8),
              amount: "",
              unit: "",
              name: "pan brioche sin corteza en lingotes",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [
            {
              id: rStep("spt",1),
              text: "calentar nata, leche, azúcar, cortezas y canela hasta hervor suave",
              status: "complete"
            },
            {
              id: rStep("spt",2),
              text: "retirar y enfriar infusionando",
              status: "complete"
            },
            {
              id: rStep("spt",3),
              text: "batir huevos, colar la infusión y añadirla fría poco a poco",
              status: "complete"
            },
            {
              id: rStep("spt",4),
              text: "remojar el pan sin que se deshaga",
              status: "complete"
            },
            {
              id: rStep("spt",5),
              text: "freír en aceite suave hasta dorado y escurrir",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782554.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Dulce","Postre"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("coulis-de-frambuesa"),
          name: "Coulis de frambuesa",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("coulis-fram",1),
              amount: "250",
              unit: "g",
              name: "frambuesas",
              quantity: {
                kind: "exact",
                originalText: "250 g",
                value: 250,
                unit: "g"
              }
            },
            {
              id: rIng("coulis-fram",2),
              amount: "60–80",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "range",
                originalText: "60–80 g",
                min: 60,
                max: 80,
                unit: "g"
              }
            },
            {
              id: rIng("coulis-fram",3),
              amount: "",
              unit: "",
              name: "zumo de ½ limón",
              quantity: {
                kind: "exact",
                originalText: "zumo de ½ limón"
              }
            },
            {
              id: rIng("coulis-fram",4),
              amount: "2–3",
              unit: "cucharadas",
              name: "agua",
              quantity: {
                kind: "range",
                originalText: "2–3 cucharadas",
                min: 2,
                max: 3,
                unit: "cucharadas"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782566.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("coulis-fram","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Dulce","Fruta"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-baileys"),
          name: "Salsa Baileys",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("baileys",1),
              amount: "400",
              unit: "gr",
              name: "Baileys",
              quantity: {
                kind: "exact",
                originalText: "400 gr",
                value: 400,
                unit: "gr"
              }
            },
            {
              id: rIng("baileys",2),
              amount: "300",
              unit: "ml",
              name: "nata",
              quantity: {
                kind: "exact",
                originalText: "300 ml",
                value: 300,
                unit: "ml"
              }
            },
            {
              id: rIng("baileys",3),
              amount: "",
              unit: "",
              name: "xantana",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782566.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("baileys","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Dulce","Licor"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-nutella"),
          name: "Salsa Nutella",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("nutella",1),
              amount: "300",
              unit: "gr",
              name: "Nutella",
              quantity: {
                kind: "exact",
                originalText: "300 gr",
                value: 300,
                unit: "gr"
              }
            },
            {
              id: rIng("nutella",2),
              amount: "100",
              unit: "gr",
              name: "agua caliente",
              quantity: {
                kind: "exact",
                originalText: "100 gr",
                value: 100,
                unit: "gr"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782566.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("nutella","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Dulce","Chocolate"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("sifone-da-litro"),
          name: "Sifone da litro",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("sifone",1),
              amount: "400",
              unit: "ml",
              name: "panna fresca",
              quantity: {
                kind: "exact",
                originalText: "400 ml",
                value: 400,
                unit: "ml"
              }
            },
            {
              id: rIng("sifone",2),
              amount: "200",
              unit: "ml",
              name: "latte intero",
              quantity: {
                kind: "exact",
                originalText: "200 ml",
                value: 200,
                unit: "ml"
              }
            },
            {
              id: rIng("sifone",3),
              amount: "220–240",
              unit: "g",
              name: "Parmigiano Reggiano grattugiato",
              quantity: {
                kind: "range",
                originalText: "220–240 g",
                min: 220,
                max: 240,
                unit: "g"
              }
            },
            {
              id: rIng("sifone",4),
              amount: "",
              unit: "",
              name: "pepe nero q.b.",
              quantity: {
                kind: "to_taste",
                originalText: "q.b."
              }
            },
            {
              id: rIng("sifone",5),
              amount: "",
              unit: "",
              name: "noce moscata q.b.",
              quantity: {
                kind: "to_taste",
                originalText: "q.b."
              }
            },
            {
              id: rIng("sifone",6),
              amount: "4",
              unit: "g",
              name: "gelatina",
              quantity: {
                kind: "exact",
                originalText: "4 g (anotación manuscrita)",
                value: 4,
                unit: "g"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782579.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("sifone","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Preparación base","Italiano"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("ajoaceite"),
          name: "Ajoaceite",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("ajo",1),
              amount: "500",
              unit: "ml",
              name: "leche",
              quantity: {
                kind: "exact",
                originalText: "500 ml",
                value: 500,
                unit: "ml"
              }
            },
            {
              id: rIng("ajo",2),
              amount: "3",
              unit: "dientes",
              name: "ajo",
              quantity: {
                kind: "exact",
                originalText: "3 dientes",
                value: 3,
                unit: "dientes"
              }
            },
            {
              id: rIng("ajo",3),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("ajo",4),
              amount: "500–700",
              unit: "ml",
              name: "aceite de girasol",
              quantity: {
                kind: "range",
                originalText: "500–700 ml (aprox.)",
                min: 500,
                max: 700,
                unit: "ml"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782579.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("ajo","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Preparación base"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("crema-de-pecorino"),
          name: "Crema de pecorino",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("pecorino",1),
              amount: "1",
              unit: "kg",
              name: "pecorino rallado",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("pecorino",2),
              amount: "670",
              unit: "ml",
              name: "nata",
              quantity: {
                kind: "exact",
                originalText: "670 ml",
                value: 670,
                unit: "ml"
              }
            },
            {
              id: rIng("pecorino",3),
              amount: "670",
              unit: "ml",
              name: "leche entera",
              quantity: {
                kind: "exact",
                originalText: "670 ml",
                value: 670,
                unit: "ml"
              }
            },
            {
              id: rIng("pecorino",4),
              amount: "8",
              unit: "g",
              name: "goma xantana",
              quantity: {
                kind: "exact",
                originalText: "8 g",
                value: 8,
                unit: "g"
              }
            },
            {
              id: rIng("pecorino",5),
              amount: "8",
              unit: "cucharaditas",
              name: "maicena",
              quantity: {
                kind: "exact",
                originalText: "8 cucharaditas",
                value: 8,
                unit: "cucharaditas"
              }
            },
            {
              id: rIng("pecorino",6),
              amount: "",
              unit: "",
              name: "pimienta blanca",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("pecorino",1),
              text: "calentar nata y leche a 80 °C",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "80 °C",
                value: 80,
                unit: "C"
              }
            },
            {
              id: rStep("pecorino",2),
              text: "disolver xantana y maicena en leche fría y añadir",
              status: "complete"
            },
            {
              id: rStep("pecorino",3),
              text: "retirar",
              status: "complete"
            },
            {
              id: rStep("pecorino",4),
              text: "incorporar pecorino poco a poco",
              status: "complete"
            },
            {
              id: rStep("pecorino",5),
              text: "triturar, ajustar pimienta, enfriar",
              status: "complete"
            },
            {
              id: rStep("pecorino",6),
              text: "servicio al baño María 60–65 °C",
              status: "complete",
              temperature: {
                kind: "range",
                originalText: "60–65 °C",
                min: 60,
                max: 65,
                unit: "C"
              },
              equipment: [
                "baño María"
              ]
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782593.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Preparación base","Italiano","Queso"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-steak-tartar"),
          name: "Salsa Steak Tartar (x3)",
          description: "",
          servings: 3,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "servings",
            originalText: "x3",
            amount: 3,
            unit: "porciones",
            state: "known"
          },
          ingredients: [
            {
              id: rIng("sst",1),
              amount: "300",
              unit: "g",
              name: "ketchup",
              quantity: {
                kind: "exact",
                originalText: "300 g",
                value: 300,
                unit: "g"
              }
            },
            {
              id: rIng("sst",2),
              amount: "3",
              unit: "filetes",
              name: "anchoa (3–5 g c/u)",
              quantity: {
                kind: "range",
                originalText: "3 filetes (3–5 g c/u)",
                min: 9,
                max: 15,
                unit: "g"
              }
            },
            {
              id: rIng("sst",3),
              amount: "75",
              unit: "g",
              name: "mostaza clásica",
              quantity: {
                kind: "exact",
                originalText: "75 g",
                value: 75,
                unit: "g"
              }
            },
            {
              id: rIng("sst",4),
              amount: "75",
              unit: "g",
              name: "mostaza Dijon",
              quantity: {
                kind: "exact",
                originalText: "75 g",
                value: 75,
                unit: "g"
              }
            },
            {
              id: rIng("sst",5),
              amount: "75",
              unit: "g",
              name: "salsa Worcestershire",
              quantity: {
                kind: "exact",
                originalText: "75 g",
                value: 75,
                unit: "g"
              }
            },
            {
              id: rIng("sst",6),
              amount: "300",
              unit: "g",
              name: "AOVE",
              quantity: {
                kind: "exact",
                originalText: "300 g",
                value: 300,
                unit: "g"
              }
            }
          ],
          steps: [
            {
              id: rStep("sst",1),
              text: "pesar, romper anchoas, triturar todo hasta mezcla cremosa",
              status: "complete"
            },
            {
              id: rStep("sst",2),
              text: "rectificar sal y guardar en frío",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782605.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Carne","Frío"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-costillas"),
          name: "Salsa costillas",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("cost",1),
              amount: "2",
              unit: "L",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "2 L",
                value: 2,
                unit: "L"
              }
            },
            {
              id: rIng("cost",2),
              amount: "700",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "700 g",
                value: 700,
                unit: "g"
              }
            },
            {
              id: rIng("cost",3),
              amount: "16",
              unit: "g",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "16 g",
                value: 16,
                unit: "g"
              }
            },
            {
              id: rIng("cost",4),
              amount: "30",
              unit: "g",
              name: "soya",
              quantity: {
                kind: "exact",
                originalText: "30 g",
                value: 30,
                unit: "g"
              }
            },
            {
              id: rIng("cost",5),
              amount: "400",
              unit: "g",
              name: "teriyaki",
              quantity: {
                kind: "exact",
                originalText: "400 g",
                value: 400,
                unit: "g"
              }
            },
            {
              id: rIng("cost",6),
              amount: "1",
              unit: "",
              name: "cayena o 2 guindillas",
              quantity: {
                kind: "exact",
                originalText: "1 cayena o 2 guindillas"
              }
            },
            {
              id: rIng("cost",7),
              amount: "700",
              unit: "ml",
              name: "tomate (Cristal Teca)",
              quantity: {
                kind: "exact",
                originalText: "700 ml",
                value: 700,
                unit: "ml"
              }
            },
            {
              id: rIng("cost",8),
              amount: "50",
              unit: "g",
              name: "pimentón dulce",
              quantity: {
                kind: "exact",
                originalText: "50 g",
                value: 50,
                unit: "g"
              }
            },
            {
              id: rIng("cost",9),
              amount: "1",
              unit: "chupito",
              name: "whisky",
              quantity: {
                kind: "exact",
                originalText: "1 chupito",
                value: 1,
                unit: "chupito"
              }
            },
            {
              id: rIng("cost",10),
              amount: "",
              unit: "",
              name: "zumo de 2 limas",
              quantity: {
                kind: "exact",
                originalText: "zumo de 2 limas"
              }
            },
            {
              id: rIng("cost",11),
              amount: "4",
              unit: "cucharas",
              name: "vinagre de Jerez",
              quantity: {
                kind: "exact",
                originalText: "4 cucharas",
                value: 4,
                unit: "cucharas"
              }
            },
            {
              id: rIng("cost",12),
              amount: "1",
              unit: "",
              name: "cebolla",
              quantity: {
                kind: "exact",
                originalText: "1 cebolla",
                value: 1
              }
            },
            {
              id: rIng("cost",13),
              amount: "",
              unit: "",
              name: "pimienta negra en grano",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("cost",1),
              text: "hervir los primeros ingredientes (agua, azúcar, sal, soya, teriyaki, cayena, tomate, pimentón, whisky)",
              status: "complete"
            },
            {
              id: rStep("cost",2),
              text: "dejar infusionar con los restantes (zumo de lima, vinagre, cebolla, pimienta)",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782620.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Carne","Barbacoa"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("chimichurri"),
          name: "Chimichurri",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("chimi",1),
              amount: "1",
              unit: "bandeja",
              name: "tomillo fresco",
              quantity: {
                kind: "exact",
                originalText: "1 bandeja",
                value: 1,
                unit: "bandeja"
              }
            },
            {
              id: rIng("chimi",2),
              amount: "1",
              unit: "bandeja",
              name: "orégano",
              quantity: {
                kind: "exact",
                originalText: "1 bandeja",
                value: 1,
                unit: "bandeja"
              }
            },
            {
              id: rIng("chimi",3),
              amount: "2",
              unit: "cucharadas",
              name: "peperoncino picante",
              quantity: {
                kind: "exact",
                originalText: "2 cucharadas",
                value: 2,
                unit: "cucharadas"
              }
            },
            {
              id: rIng("chimi",4),
              amount: "3",
              unit: "hojas",
              name: "laurel",
              quantity: {
                kind: "exact",
                originalText: "3 hojas",
                value: 3,
                unit: "hojas"
              }
            },
            {
              id: rIng("chimi",5),
              amount: "1",
              unit: "cucharada",
              name: "vinagre de manzana",
              quantity: {
                kind: "exact",
                originalText: "1 cucharada",
                value: 1,
                unit: "cucharada"
              }
            },
            {
              id: rIng("chimi",6),
              amount: "",
              unit: "",
              name: "aceite para cubrir",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "para cubrir"
              }
            }
          ],
          steps: [
            {
              id: rStep("chimi",1),
              text: "picar tomillo y orégano",
              status: "complete"
            },
            {
              id: rStep("chimi",2),
              text: "mezclar todo en táper y cubrir de aceite",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782631.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Guarnición","Argentino"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("emulsion-de-piparra"),
          name: "Emulsión de piparra",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("piparra",1),
              amount: "25",
              unit: "",
              name: "piparras sin semillas",
              quantity: {
                kind: "exact",
                originalText: "25",
                value: 25
              }
            },
            {
              id: rIng("piparra",2),
              amount: "",
              unit: "",
              name: "cilantro generoso",
              quantity: {
                kind: "to_taste",
                originalText: "generoso",
                note: "generoso"
              }
            },
            {
              id: rIng("piparra",3),
              amount: "",
              unit: "",
              name: "perejil generoso",
              quantity: {
                kind: "to_taste",
                originalText: "generoso",
                note: "generoso"
              }
            },
            {
              id: rIng("piparra",4),
              amount: "",
              unit: "",
              name: "ralladura y zumo de lima generoso",
              quantity: {
                kind: "to_taste",
                originalText: "generoso",
                note: "generoso"
              }
            },
            {
              id: rIng("piparra",5),
              amount: "",
              unit: "",
              name: "agua de la piparra",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("piparra",6),
              amount: "",
              unit: "",
              name: "agua",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("piparra",7),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("piparra",8),
              amount: "",
              unit: "",
              name: "pan pimbo",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [
            {
              id: rStep("piparra",1),
              text: "buscar textura líquida, probar de sal, colar y arreglar con xantana",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782644.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Emulsión","Verdura"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("guacamole"),
          name: "Guacamole",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("guac",1),
              amount: "4",
              unit: "",
              name: "aguacates (≈800 g limpios)",
              quantity: {
                kind: "approximate",
                originalText: "4 (≈800 g limpios)",
                value: 800,
                unit: "g",
                note: "≈800 g limpios"
              }
            },
            {
              id: rIng("guac",2),
              amount: "1",
              unit: "",
              name: "cebolla morada (≈100 g)",
              quantity: {
                kind: "approximate",
                originalText: "1 (≈100 g)",
                value: 100,
                unit: "g",
                note: "≈100 g"
              }
            },
            {
              id: rIng("guac",3),
              amount: "",
              unit: "",
              name: "jugo 2 limas",
              quantity: {
                kind: "exact",
                originalText: "jugo 2 limas"
              }
            },
            {
              id: rIng("guac",4),
              amount: "6–8",
              unit: "cucharadas",
              name: "cilantro",
              quantity: {
                kind: "range",
                originalText: "6–8 cucharadas",
                min: 6,
                max: 8,
                unit: "cucharadas"
              }
            },
            {
              id: rIng("guac",5),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782658.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("guac","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Mexicano","Frío","Verdura"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("guacamole-de-papaya"),
          name: "Guacamole de papaya",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("guacpap",1),
              amount: "800",
              unit: "g",
              name: "papaya limpia en cubos",
              quantity: {
                kind: "exact",
                originalText: "800 g",
                value: 800,
                unit: "g"
              }
            },
            {
              id: rIng("guacpap",2),
              amount: "1",
              unit: "",
              name: "cebolla morada (≈100 g)",
              quantity: {
                kind: "approximate",
                originalText: "1 (≈100 g)",
                value: 100,
                unit: "g",
                note: "≈100 g"
              }
            },
            {
              id: rIng("guacpap",3),
              amount: "",
              unit: "",
              name: "jugo 2 limas",
              quantity: {
                kind: "exact",
                originalText: "jugo 2 limas"
              }
            },
            {
              id: rIng("guacpap",4),
              amount: "6–8",
              unit: "cucharadas",
              name: "cilantro",
              quantity: {
                kind: "range",
                originalText: "6–8 cucharadas",
                min: 6,
                max: 8,
                unit: "cucharadas"
              }
            },
            {
              id: rIng("guacpap",5),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782658.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("guacpap","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Mexicano","Frío","Fruta"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("honey-lime"),
          name: "Honey lime (vinagreta de apio)",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("hl",1),
              amount: "150",
              unit: "gr",
              name: "aceite de e. virgen",
              quantity: {
                kind: "exact",
                originalText: "150 gr",
                value: 150,
                unit: "gr"
              }
            },
            {
              id: rIng("hl",2),
              amount: "100",
              unit: "gr",
              name: "zumo lima",
              quantity: {
                kind: "exact",
                originalText: "100 gr",
                value: 100,
                unit: "gr"
              }
            },
            {
              id: rIng("hl",3),
              amount: "50",
              unit: "gr",
              name: "miel",
              quantity: {
                kind: "exact",
                originalText: "50 gr",
                value: 50,
                unit: "gr"
              }
            },
            {
              id: rIng("hl",4),
              amount: "",
              unit: "",
              name: "agua de apio",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782671.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("hl","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Vinagreta","Salsa","Frío"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("coulis-verde-estable"),
          name: "Coulis verde estable (para biberón)",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("cve",1),
              amount: "100",
              unit: "g",
              name: "hojas verdes",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("cve",2),
              amount: "80",
              unit: "g",
              name: "aceite suave",
              quantity: {
                kind: "exact",
                originalText: "80 g",
                value: 80,
                unit: "g"
              }
            },
            {
              id: rIng("cve",3),
              amount: "20",
              unit: "g",
              name: "agua fría",
              quantity: {
                kind: "exact",
                originalText: "20 g",
                value: 20,
                unit: "g"
              }
            },
            {
              id: rIng("cve",4),
              amount: "0,25",
              unit: "g",
              name: "xantana",
              quantity: {
                kind: "exact",
                originalText: "0,25 g",
                value: 0.25,
                unit: "g"
              }
            },
            {
              id: rIng("cve",5),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("cve",1),
              text: "blanquear 10 s y enfriar",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "10 s",
                minutes: 0.167
              }
            },
            {
              id: rStep("cve",2),
              text: "escurrir",
              status: "complete"
            },
            {
              id: rStep("cve",3),
              text: "triturar con aceite y agua",
              status: "complete"
            },
            {
              id: rStep("cve",4),
              text: "añadir xantana 5–10 s",
              status: "complete",
              time: {
                kind: "range",
                originalText: "5–10 s",
                minMinutes: 0.083,
                maxMinutes: 0.167
              }
            },
            {
              id: rStep("cve",5),
              text: "salar, colar y pasar a biberón",
              status: "complete"
            },
            {
              id: rStep("cve",6),
              text: "nevera, 5–7 días",
              status: "complete",
              time: {
                kind: "range",
                originalText: "5–7 días",
                minMinutes: 7200,
                maxMinutes: 10080
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782682.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Verdura","Preparación base"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("leche-de-tigre"),
          name: "Leche de tigre",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("lt",1),
              amount: "300",
              unit: "ml",
              name: "zumo lima",
              quantity: {
                kind: "exact",
                originalText: "300 ml",
                value: 300,
                unit: "ml"
              }
            },
            {
              id: rIng("lt",2),
              amount: "4",
              unit: "",
              name: "fresas",
              quantity: {
                kind: "exact",
                originalText: "4",
                value: 4
              }
            },
            {
              id: rIng("lt",3),
              amount: "10",
              unit: "g",
              name: "jengibre",
              quantity: {
                kind: "exact",
                originalText: "10 g",
                value: 10,
                unit: "g"
              }
            },
            {
              id: rIng("lt",4),
              amount: "8",
              unit: "hojas",
              name: "cilantro",
              quantity: {
                kind: "exact",
                originalText: "8 hojas",
                value: 8,
                unit: "hojas"
              }
            },
            {
              id: rIng("lt",5),
              amount: "6/8",
              unit: "hojas",
              name: "hierbabuena",
              quantity: {
                kind: "range",
                originalText: "6/8 hojas",
                min: 6,
                max: 8,
                unit: "hojas"
              }
            },
            {
              id: rIng("lt",6),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("lt",7),
              amount: "1–2",
              unit: "g",
              name: "azúcar moreno",
              quantity: {
                kind: "range",
                originalText: "1–2 g",
                min: 1,
                max: 2,
                unit: "g"
              }
            },
            {
              id: rIng("lt",8),
              amount: "5",
              unit: "ml",
              name: "ron",
              quantity: {
                kind: "exact",
                originalText: "5 ml",
                value: 5,
                unit: "ml"
              }
            },
            {
              id: rIng("lt",9),
              amount: "1",
              unit: "g máx.",
              name: "xantana",
              quantity: {
                kind: "exact",
                originalText: "1 g máx.",
                value: 1,
                unit: "g"
              }
            }
          ],
          steps: [
            {
              id: rStep("lt",1),
              text: "triturar lima, fresa, sal, azúcar y jengibre",
              status: "complete"
            },
            {
              id: rStep("lt",2),
              text: "añadir hierbas, triturar 5 s y colar",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "5 s",
                minutes: 0.083
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782695.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Peruano","Pescado","Frío"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("aceite-de-hierbabuena"),
          name: "Aceite de hierbabuena",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("ah",1),
              amount: "100",
              unit: "g",
              name: "hierbabuena",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("ah",2),
              amount: "1",
              unit: "L",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "1 L",
                value: 1,
                unit: "L"
              }
            },
            {
              id: rIng("ah",3),
              amount: "150",
              unit: "g",
              name: "aceite girasol",
              quantity: {
                kind: "exact",
                originalText: "150 g",
                value: 150,
                unit: "g"
              }
            },
            {
              id: rIng("ah",4),
              amount: "0,2",
              unit: "g",
              name: "xantana",
              quantity: {
                kind: "exact",
                originalText: "0,2 g",
                value: 0.2,
                unit: "g"
              }
            },
            {
              id: rIng("ah",5),
              amount: "",
              unit: "",
              name: "hielo",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "para enfriar"
              }
            }
          ],
          steps: [
            {
              id: rStep("ah",1),
              text: "blanquear 15 s y enfriar",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "15 s",
                minutes: 0.25
              }
            },
            {
              id: rStep("ah",2),
              text: "triturar hierbabuena con 100 ml agua fría, colar y reposar 10–15 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "10–15 min",
                minMinutes: 10,
                maxMinutes: 15
              }
            },
            {
              id: rStep("ah",3),
              text: "recuperar clorofila",
              status: "complete"
            },
            {
              id: rStep("ah",4),
              text: "mezclar con aceite y xantana, triturar 5–8 s y colar fino",
              status: "complete",
              time: {
                kind: "range",
                originalText: "5–8 s",
                minMinutes: 0.083,
                maxMinutes: 0.133
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782709.jpg")
          ],
          uncertainties: [],
          tags: ["Aceite","Preparación base","Verdura"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("goulash"),
          name: "Goulash",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("gou",1),
              amount: "",
              unit: "",
              name: "cebolla (del mismo peso que la carne)",
              quantity: {
                kind: "proportional",
                originalText: "del mismo peso que la carne",
                note: "mismo peso que la carne"
              }
            },
            {
              id: rIng("gou",2),
              amount: "3",
              unit: "ajos/kg",
              name: "ajo",
              quantity: {
                kind: "proportional",
                originalText: "3 ajos/kg",
                note: "por kg de carne"
              }
            },
            {
              id: rIng("gou",3),
              amount: "5",
              unit: "g/kg",
              name: "comino",
              quantity: {
                kind: "proportional",
                originalText: "5 g/kg",
                value: 5,
                unit: "g/kg"
              }
            },
            {
              id: rIng("gou",4),
              amount: "40",
              unit: "g/kg",
              name: "pimentón dulce",
              quantity: {
                kind: "proportional",
                originalText: "40 g/kg",
                value: 40,
                unit: "g/kg"
              }
            },
            {
              id: rIng("gou",5),
              amount: "",
              unit: "",
              name: "aceite de semilla (roux) [ilegible]",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad ilegible en la imagen"
              }
            },
            {
              id: rIng("gou",6),
              amount: "",
              unit: "",
              name: "harina (roux) [ilegible]",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad ilegible en la imagen"
              }
            },
            {
              id: rIng("gou",7),
              amount: "120",
              unit: "ml/kg",
              name: "agua",
              quantity: {
                kind: "proportional",
                originalText: "120 ml/kg",
                value: 120,
                unit: "ml/kg"
              }
            }
          ],
          steps: [
            {
              id: rStep("gou",1),
              text: "pochar cebolla 30–40 min, añadir ajo a los 20",
              status: "complete",
              time: {
                kind: "range",
                originalText: "30–40 min",
                minMinutes: 30,
                maxMinutes: 40
              }
            },
            {
              id: rStep("gou",2),
              text: "añadir especias y agua, cocinar 5 min y añadir roux",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "5 min",
                minutes: 5
              }
            },
            {
              id: rStep("gou",3),
              text: "dorar carne a 230 °C sin humedad",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "230 °C",
                value: 230,
                unit: "C"
              }
            },
            {
              id: rStep("gou",4),
              text: "añadir caldo y cocinar a 135 °C con 80 % humedad hasta sonda 93 °C",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "135 °C",
                value: 135,
                unit: "C"
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782731.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("gou","roux"),
              fieldPath: "ingredients.roux",
              state: "uncertain",
              note: "Cantidades de aceite de semilla y harina para el roux ilegibles en la imagen; revisar 1777285782731.jpg"
            }
          ],
          tags: ["Guiso","Carne","Húngaro","Caliente"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("receta-miso"),
          name: "Receta miso",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("miso",1),
              amount: "500",
              unit: "g",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "500 g",
                value: 500,
                unit: "g"
              }
            },
            {
              id: rIng("miso",2),
              amount: "250",
              unit: "g",
              name: "miso",
              quantity: {
                kind: "exact",
                originalText: "250 g",
                value: 250,
                unit: "g"
              }
            },
            {
              id: rIng("miso",3),
              amount: "50",
              unit: "g",
              name: "miel",
              quantity: {
                kind: "exact",
                originalText: "50 g",
                value: 50,
                unit: "g"
              }
            },
            {
              id: rIng("miso",4),
              amount: "10–12",
              unit: "g",
              name: "pimentón dulce",
              quantity: {
                kind: "range",
                originalText: "10–12 g",
                min: 10,
                max: 12,
                unit: "g"
              }
            },
            {
              id: rIng("miso",5),
              amount: "10–12",
              unit: "g",
              name: "orégano fresco picado",
              quantity: {
                kind: "range",
                originalText: "10–12 g",
                min: 10,
                max: 12,
                unit: "g"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782744.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("miso","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Japonés","Preparación base"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("babaganoush"),
          name: "Babaganoush",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("baba",1),
              amount: "4",
              unit: "",
              name: "berenjenas (800 g–1 kg)",
              quantity: {
                kind: "range",
                originalText: "4 (800 g–1 kg)",
                min: 800,
                max: 1000,
                unit: "g"
              }
            },
            {
              id: rIng("baba",2),
              amount: "1",
              unit: "",
              name: "ajo (5 g)",
              quantity: {
                kind: "exact",
                originalText: "1 (5 g)",
                value: 5,
                unit: "g"
              }
            },
            {
              id: rIng("baba",3),
              amount: "10",
              unit: "g",
              name: "hierbabuena",
              quantity: {
                kind: "exact",
                originalText: "10 g",
                value: 10,
                unit: "g"
              }
            },
            {
              id: rIng("baba",4),
              amount: "8",
              unit: "cucharadas/120 ml",
              name: "zumo limón",
              quantity: {
                kind: "exact",
                originalText: "8 cucharadas/120 ml",
                value: 120,
                unit: "ml"
              }
            },
            {
              id: rIng("baba",5),
              amount: "4",
              unit: "cucharadas/60 g",
              name: "tahín",
              quantity: {
                kind: "exact",
                originalText: "4 cucharadas/60 g",
                value: 60,
                unit: "g"
              }
            },
            {
              id: rIng("baba",6),
              amount: "5",
              unit: "g",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "5 g",
                value: 5,
                unit: "g"
              }
            },
            {
              id: rIng("baba",7),
              amount: "1",
              unit: "g",
              name: "pimienta negra",
              quantity: {
                kind: "exact",
                originalText: "1 g",
                value: 1,
                unit: "g"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782744.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("baba","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Árabe","Frío","Verdura"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("berenjena-al-horno"),
          name: "Berenjena al horno",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("bh",1),
              amount: "",
              unit: "",
              name: "berenjena",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("bh",2),
              amount: "",
              unit: "",
              name: "aceite",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("bh",3),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("bh",4),
              amount: "",
              unit: "",
              name: "pimienta",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("bh",1),
              text: "cortar a la mitad, retirar piel alterna, incidir pulpa, aliñar",
              status: "complete"
            },
            {
              id: rStep("bh",2),
              text: "usar programa Berenjena del horno Rational y revisar cocción",
              status: "complete",
              equipment: [
                "horno Rational"
              ]
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782760.jpg")
          ],
          uncertainties: [],
          tags: ["Verdura","Guarnición","Horno"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("picadito-berenjena"),
          name: "Picadito berenjena",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("pb",1),
              amount: "100",
              unit: "g",
              name: "tomate seco",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("pb",2),
              amount: "25–30",
              unit: "g",
              name: "alcaparras",
              quantity: {
                kind: "range",
                originalText: "25–30 g",
                min: 25,
                max: 30,
                unit: "g"
              }
            },
            {
              id: rIng("pb",3),
              amount: "10–12",
              unit: "g",
              name: "albahaca",
              quantity: {
                kind: "range",
                originalText: "10–12 g",
                min: 10,
                max: 12,
                unit: "g"
              }
            },
            {
              id: rIng("pb",4),
              amount: "120–150",
              unit: "ml",
              name: "aceite oliva",
              quantity: {
                kind: "range",
                originalText: "120–150 ml",
                min: 120,
                max: 150,
                unit: "ml"
              }
            },
            {
              id: rIng("pb",5),
              amount: "",
              unit: "",
              name: "pimienta",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782760.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("pb","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Verdura","Guarnición","Frío","Italiano"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("tempura-sifon"),
          name: "Tempura sifón",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("ts",1),
              amount: "150",
              unit: "g",
              name: "harina",
              quantity: {
                kind: "exact",
                originalText: "150 g",
                value: 150,
                unit: "g"
              }
            },
            {
              id: rIng("ts",2),
              amount: "1",
              unit: "",
              name: "baking powder",
              quantity: {
                kind: "exact",
                originalText: "1",
                value: 1
              }
            },
            {
              id: rIng("ts",3),
              amount: "26",
              unit: "g",
              name: "maicena",
              quantity: {
                kind: "exact",
                originalText: "26 g",
                value: 26,
                unit: "g"
              }
            },
            {
              id: rIng("ts",4),
              amount: "300",
              unit: "g",
              name: "agua con gas San Pellegrino",
              quantity: {
                kind: "exact",
                originalText: "300 g",
                value: 300,
                unit: "g"
              }
            },
            {
              id: rIng("ts",5),
              amount: "6,7",
              unit: "pelos",
              name: "azafrán",
              quantity: {
                kind: "exact",
                originalText: "6,7 pelos",
                value: 6.7,
                unit: "pelos"
              }
            }
          ],
          steps: [
            {
              id: rStep("ts",1),
              text: "mezclar, poner en sifón con 1 o 2 cargas",
              status: "complete",
              equipment: [
                "sifón"
              ]
            },
            {
              id: rStep("ts",2),
              text: "preparar 2/3 h antes y usar frío",
              status: "complete",
              time: {
                kind: "range",
                originalText: "2/3 h",
                minMinutes: 120,
                maxMinutes: 180
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782775.jpg")
          ],
          uncertainties: [],
          tags: ["Masa","Frito","Japonés","Guarnición"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("cebolla-encurtida"),
          name: "Cebolla encurtida",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("ce",1),
              amount: "200",
              unit: "ml",
              name: "zumo limón",
              quantity: {
                kind: "exact",
                originalText: "200 ml",
                value: 200,
                unit: "ml"
              }
            },
            {
              id: rIng("ce",2),
              amount: "100",
              unit: "ml",
              name: "vinagre",
              quantity: {
                kind: "exact",
                originalText: "100 ml",
                value: 100,
                unit: "ml"
              }
            },
            {
              id: rIng("ce",3),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("ce",4),
              amount: "",
              unit: "",
              name: "pimienta",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("ce",5),
              amount: "8",
              unit: "",
              name: "cebollas moradas",
              quantity: {
                kind: "exact",
                originalText: "8",
                value: 8
              }
            },
            {
              id: rIng("ce",6),
              amount: "100",
              unit: "ml",
              name: "agua caliente",
              quantity: {
                kind: "exact",
                originalText: "100 ml",
                value: 100,
                unit: "ml"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782775.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("ce","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Encurtido","Verdura","Guarnición"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("espuma-de-gorgonzola"),
          name: "Espuma de gorgonzola (sifón)",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("eg",1),
              amount: "150",
              unit: "g",
              name: "gorgonzola",
              quantity: {
                kind: "exact",
                originalText: "150 g",
                value: 150,
                unit: "g"
              }
            },
            {
              id: rIng("eg",2),
              amount: "200",
              unit: "ml",
              name: "nata 30–35 % MG",
              quantity: {
                kind: "range",
                originalText: "200 ml 30–35 % MG",
                min: 30,
                max: 35,
                unit: "% MG"
              }
            },
            {
              id: rIng("eg",3),
              amount: "50",
              unit: "ml",
              name: "leche",
              quantity: {
                kind: "exact",
                originalText: "50 ml",
                value: 50,
                unit: "ml"
              }
            },
            {
              id: rIng("eg",4),
              amount: "",
              unit: "",
              name: "pimienta blanca",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("eg",1),
              text: "fundir sin hervir",
              status: "complete"
            },
            {
              id: rStep("eg",2),
              text: "ajustar",
              status: "complete"
            },
            {
              id: rStep("eg",3),
              text: "triturar y colar",
              status: "complete"
            },
            {
              id: rStep("eg",4),
              text: "cargar caliente en sifón con 1 cápsula N₂O, agitar 4–5 veces y enfriar mínimo 2 h",
              status: "complete",
              equipment: [
                "sifón",
                "cápsula N₂O"
              ],
              time: {
                kind: "duration",
                originalText: "mínimo 2 h",
                minutes: 120
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782790.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Queso","Italiano","Espuma"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("espuma-de-patata"),
          name: "Espuma de patata",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("ep",1),
              amount: "50",
              unit: "g",
              name: "ajo",
              quantity: {
                kind: "exact",
                originalText: "50 g",
                value: 50,
                unit: "g"
              }
            },
            {
              id: rIng("ep",2),
              amount: "100",
              unit: "g",
              name: "chalota",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("ep",3),
              amount: "100",
              unit: "g",
              name: "aceite oliva",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("ep",4),
              amount: "30",
              unit: "g",
              name: "aceite oliva (adicional)",
              quantity: {
                kind: "exact",
                originalText: "+30 g",
                value: 30,
                unit: "g"
              }
            },
            {
              id: rIng("ep",5),
              amount: "1",
              unit: "kg",
              name: "patata",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("ep",6),
              amount: "",
              unit: "",
              name: "agua caliente",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "la necesaria para cubrir"
              }
            },
            {
              id: rIng("ep",7),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("ep",1),
              text: "pochar ajo y chalota",
              status: "complete"
            },
            {
              id: rStep("ep",2),
              text: "añadir patata y agua hasta cubrir",
              status: "complete"
            },
            {
              id: rStep("ep",3),
              text: "cocer tierna",
              status: "complete"
            },
            {
              id: rStep("ep",4),
              text: "triturar 3 min",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "3 min",
                minutes: 3
              }
            },
            {
              id: rStep("ep",5),
              text: "ajustar sal y aceite",
              status: "complete"
            },
            {
              id: rStep("ep",6),
              text: "cargar 400 g en sifón con 2 cargas",
              status: "complete",
              equipment: [
                "sifón"
              ]
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782804.jpg")
          ],
          uncertainties: [],
          tags: ["Espuma","Verdura","Guarnición"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("cebolla-caramelizada"),
          name: "Cebolla caramelizada x burrata",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("cc",1),
              amount: "5",
              unit: "",
              name: "cebollas",
              quantity: {
                kind: "exact",
                originalText: "5",
                value: 5
              }
            },
            {
              id: rIng("cc",2),
              amount: "100",
              unit: "ml",
              name: "aceite oliva",
              quantity: {
                kind: "exact",
                originalText: "100 ml",
                value: 100,
                unit: "ml"
              }
            },
            {
              id: rIng("cc",3),
              amount: "10",
              unit: "g",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "10 g",
                value: 10,
                unit: "g"
              }
            },
            {
              id: rIng("cc",4),
              amount: "25",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "25 g",
                value: 25,
                unit: "g"
              }
            },
            {
              id: rIng("cc",5),
              amount: "30",
              unit: "ml",
              name: "vinagre Jerez",
              quantity: {
                kind: "exact",
                originalText: "30 ml",
                value: 30,
                unit: "ml"
              }
            },
            {
              id: rIng("cc",6),
              amount: "150",
              unit: "ml",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "150 ml",
                value: 150,
                unit: "ml"
              }
            },
            {
              id: rIng("cc",7),
              amount: "",
              unit: "",
              name: "pimienta",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("cc",1),
              text: "cortar discos 1,5 cm",
              status: "complete"
            },
            {
              id: rStep("cc",2),
              text: "cocinar tapado 20–25 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "20–25 min",
                minMinutes: 20,
                maxMinutes: 25
              }
            },
            {
              id: rStep("cc",3),
              text: "añadir azúcar 5–8 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "5–8 min",
                minMinutes: 5,
                maxMinutes: 8
              }
            },
            {
              id: rStep("cc",4),
              text: "desglasar con vinagre y agua y reducir 8–10 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "8–10 min",
                minMinutes: 8,
                maxMinutes: 10
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782820.jpg")
          ],
          uncertainties: [],
          tags: ["Verdura","Guarnición","Italiano"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("scrippelle"),
          name: "Scrippelle",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("scr",1),
              amount: "10",
              unit: "",
              name: "huevos",
              quantity: {
                kind: "exact",
                originalText: "10",
                value: 10
              }
            },
            {
              id: rIng("scr",2),
              amount: "400",
              unit: "g",
              name: "harina",
              quantity: {
                kind: "exact",
                originalText: "400 g",
                value: 400,
                unit: "g"
              }
            },
            {
              id: rIng("scr",3),
              amount: "",
              unit: "",
              name: "agua [cantidad ilegible]",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "impreso '800/1 ml', revisar imagen 1777285782835.jpg"
              }
            },
            {
              id: rIng("scr",4),
              amount: "",
              unit: "",
              name: "pizca sal",
              quantity: {
                kind: "to_taste",
                originalText: "pizca"
              }
            },
            {
              id: rIng("scr",5),
              amount: "",
              unit: "",
              name: "aceite para sartén",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782835.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("scr","agua"),
              fieldPath: "ingredients.water",
              state: "uncertain",
              note: "Cantidad de agua ilegible: impreso '800/1 ml', revisar imagen 1777285782835.jpg"
            },
            {
              id: rUnc("scr","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Masa","Italiano","Panadería"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("besciamella"),
          name: "Besciamella",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("bes",1),
              amount: "100",
              unit: "g",
              name: "mantequilla",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("bes",2),
              amount: "100",
              unit: "g",
              name: "harina",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("bes",3),
              amount: "1",
              unit: "L",
              name: "leche",
              quantity: {
                kind: "exact",
                originalText: "1 L",
                value: 1,
                unit: "L"
              }
            },
            {
              id: rIng("bes",4),
              amount: "1",
              unit: "cucharilla",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "1 cucharilla",
                value: 1,
                unit: "cucharilla"
              }
            },
            {
              id: rIng("bes",5),
              amount: "4",
              unit: "pizcas",
              name: "pimienta negra",
              quantity: {
                kind: "exact",
                originalText: "4 pizcas",
                value: 4,
                unit: "pizcas"
              }
            },
            {
              id: rIng("bes",6),
              amount: "4",
              unit: "pizcas",
              name: "nuez moscada",
              quantity: {
                kind: "exact",
                originalText: "4 pizcas",
                value: 4,
                unit: "pizcas"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782835.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("bes","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Preparación base","Italiano"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("puerro-con-pecorino-yema-shiitake"),
          name: "Puerro con pecorino, yema y shiitake",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [],
          steps: [
            {
              id: rStep("puerro",1),
              text: "puerro al vacío con sal y aceite, 83 °C 50 min",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "83 °C",
                value: 83,
                unit: "C"
              },
              time: {
                kind: "duration",
                originalText: "50 min",
                minutes: 50
              },
              equipment: [
                "envasadora al vacío"
              ]
            },
            {
              id: rStep("puerro",2),
              text: "crema de pecorino a 80 °C y servicio 60–65 °C",
              status: "complete",
              temperature: {
                kind: "range",
                originalText: "60–80 °C",
                min: 60,
                max: 80,
                unit: "C"
              }
            },
            {
              id: rStep("puerro",3),
              text: "crema de yema emulsionada, envasada y cocida 69 °C/1 h",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "69 °C",
                value: 69,
                unit: "C"
              },
              time: {
                kind: "duration",
                originalText: "1 h",
                minutes: 60
              }
            },
            {
              id: rStep("puerro",4),
              text: "panko con grasa rubia gallega, tomillo y pimienta a 110 °C 25–30 min",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "110 °C",
                value: 110,
                unit: "C"
              },
              time: {
                kind: "range",
                originalText: "25–30 min",
                minMinutes: 25,
                maxMinutes: 30
              }
            },
            {
              id: rStep("puerro",5),
              text: "shiitake laminado 1–2 mm a 90–100 °C 45–60 min",
              status: "complete",
              temperature: {
                kind: "range",
                originalText: "90–100 °C",
                min: 90,
                max: 100,
                unit: "C"
              },
              time: {
                kind: "range",
                originalText: "45–60 min",
                minMinutes: 45,
                maxMinutes: 60
              }
            }
          ],
          preparationStatus: "complete",
          sections: [
            {
              id: rSec("puerro","pv"),
              title: "Puerro al vacío",
              kind: "phase",
              ingredients: [],
              steps: [
                {
                  id: rStep("puerro-spv",1),
                  text: "puerro al vacío con sal y aceite, 83 °C 50 min",
                  status: "complete"
                }
              ],
              referenceIds: []
            },
            {
              id: rSec("puerro","cp"),
              title: "Crema de pecorino",
              kind: "phase",
              ingredients: [],
              steps: [
                {
                  id: rStep("puerro-scp",1),
                  text: "crema de pecorino a 80 °C y servicio 60–65 °C",
                  status: "complete"
                }
              ],
              referenceIds: []
            },
            {
              id: rSec("puerro","cy"),
              title: "Crema de yema emulsionada",
              kind: "phase",
              ingredients: [],
              steps: [
                {
                  id: rStep("puerro-scy",1),
                  text: "crema de yema emulsionada, envasada y cocida 69 °C/1 h",
                  status: "complete"
                }
              ],
              referenceIds: []
            },
            {
              id: rSec("puerro","pk"),
              title: "Panko con grasa rubia gallega",
              kind: "phase",
              ingredients: [],
              steps: [
                {
                  id: rStep("puerro-spk",1),
                  text: "panko con grasa rubia gallega, tomillo y pimienta a 110 °C 25–30 min",
                  status: "complete"
                }
              ],
              referenceIds: []
            },
            {
              id: rSec("puerro","sh"),
              title: "Shiitake laminado",
              kind: "phase",
              ingredients: [],
              steps: [
                {
                  id: rStep("puerro-ssh",1),
                  text: "shiitake laminado 1–2 mm a 90–100 °C 45–60 min",
                  status: "complete"
                }
              ],
              referenceIds: []
            }
          ],
          references: [
            {
              id: rRef("puerro",1),
              targetRecipeId: rId("crema-de-pecorino"),
              relation: "component",
              note: "La crema de pecorino es una preparación separada"
            },
            {
              id: rRef("puerro",2),
              targetRecipeId: rId("crema-de-yema"),
              relation: "component",
              note: "La crema de yema emulsionada es una preparación separada"
            }
          ],
          sources: [
            img("1777285782851.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("puerro","cant"),
              fieldPath: "ingredients",
              state: "unknown",
              note: "Las cantidades remiten a preparaciones separadas en otras hojas"
            }
          ],
          tags: ["Verdura","Italiano","Plato principal"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("pulpo"),
          name: "Pulpo",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [],
          steps: [
            {
              id: rStep("pulpo",1),
              text: "limpiar, separar tentáculos y envasar al vacío, máximo 2 patas planas sin tocarse",
              status: "complete",
              equipment: [
                "envasadora al vacío"
              ]
            },
            {
              id: rStep("pulpo",2),
              text: "78 °C, vapor 100 %, toda la noche",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "78 °C",
                value: 78,
                unit: "C"
              },
              time: {
                kind: "free_text",
                originalText: "toda la noche"
              }
            },
            {
              id: rStep("pulpo",3),
              text: "servir con fregola cocida (tomate, aceitunas, caldo pescado, ralladura lima), puré guisantes, ralladura limón y bottarga",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782867.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("pulpo","ing"),
              fieldPath: "ingredients",
              state: "unknown",
              note: "No se listan ingredientes explícitos; los ingredientes de servicio se mencionan sin cantidades"
            }
          ],
          tags: ["Pescado","Marisco","Caliente"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salmon-marinado-mojito"),
          name: "Salmón marinado \"mojito\"",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("salmon",1),
              amount: "800",
              unit: "g",
              name: "salmón limpio",
              quantity: {
                kind: "exact",
                originalText: "800 g",
                value: 800,
                unit: "g"
              }
            },
            {
              id: rIng("salmon",2),
              amount: "1",
              unit: "kg",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("salmon",3),
              amount: "1",
              unit: "kg",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("salmon",4),
              amount: "4",
              unit: "",
              name: "limas",
              quantity: {
                kind: "exact",
                originalText: "4",
                value: 4
              }
            },
            {
              id: rIng("salmon",5),
              amount: "",
              unit: "",
              name: "hierbabuena",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [
            {
              id: rStep("salmon",1),
              text: "mezclar sal y azúcar con ralladura y hierbabuena",
              status: "complete"
            },
            {
              id: rStep("salmon",2),
              text: "cubrir salmón, añadir zumo",
              status: "complete"
            },
            {
              id: rStep("salmon",3),
              text: "marinar 6–8 h",
              status: "complete",
              time: {
                kind: "range",
                originalText: "6–8 h",
                minMinutes: 360,
                maxMinutes: 480
              }
            },
            {
              id: rStep("salmon",4),
              text: "limpiar, secar y reservar frío",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782882.jpg")
          ],
          uncertainties: [],
          tags: ["Pescado","Frío","Marinado"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("caldo-de-pescado"),
          name: "Caldo de pescado / bisque / salsa de pescado",
          description: "Una misma base con tres variantes: caldo (sin tomate), bisque (350 g tomate) y salsa de pescado (1 kg tomate)",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("caldo",1),
              amount: "1",
              unit: "kg",
              name: "espinas de pescado",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("caldo",2),
              amount: "100",
              unit: "g",
              name: "puerro o hinojo",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("caldo",3),
              amount: "300",
              unit: "g",
              name: "cebolla",
              quantity: {
                kind: "exact",
                originalText: "300 g",
                value: 300,
                unit: "g"
              }
            },
            {
              id: rIng("caldo",4),
              amount: "100",
              unit: "g",
              name: "aceite",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("caldo",5),
              amount: "350",
              unit: "g",
              name: "tomate (para bisque)",
              quantity: {
                kind: "exact",
                originalText: "350 g (bisque)",
                value: 350,
                unit: "g"
              }
            },
            {
              id: rIng("caldo",6),
              amount: "1",
              unit: "kg",
              name: "tomate (para salsa)",
              quantity: {
                kind: "exact",
                originalText: "1 kg (salsa)",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("caldo",7),
              amount: "3",
              unit: "g",
              name: "pimienta negra",
              quantity: {
                kind: "exact",
                originalText: "3 g",
                value: 3,
                unit: "g"
              }
            },
            {
              id: rIng("caldo",8),
              amount: "½",
              unit: "",
              name: "anís estrellado",
              quantity: {
                kind: "exact",
                originalText: "½",
                value: 0.5
              }
            },
            {
              id: rIng("caldo",9),
              amount: "",
              unit: "",
              name: "perejil, albahaca, tomillo",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidades no indicadas"
              }
            },
            {
              id: rIng("caldo",10),
              amount: "",
              unit: "",
              name: "agua",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [
            {
              id: rStep("caldo",1),
              text: "sofreír 20 min",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "20 min",
                minutes: 20
              }
            },
            {
              id: rStep("caldo",2),
              text: "añadir tomate o agua según la variante deseada",
              status: "complete"
            },
            {
              id: rStep("caldo",3),
              text: "cocer 30–40 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "30–40 min",
                minMinutes: 30,
                maxMinutes: 40
              }
            },
            {
              id: rStep("caldo",4),
              text: "infusionar 1 h",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "1 h",
                minutes: 60
              }
            },
            {
              id: rStep("caldo",5),
              text: "colar según uso",
              status: "complete"
            },
            {
              id: rStep("caldo",6),
              text: "opcionalmente emulsionar y aromatizar con limón/lima",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782896.jpg")
          ],
          uncertainties: [],
          tags: ["Caldo","Salsa","Pescado","Preparación base"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-de-tomate-casera"),
          name: "Salsa de tomate casera",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: 60,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("stc",1),
              amount: "1",
              unit: "bote",
              name: "tomate (2,5 kg)",
              quantity: {
                kind: "exact",
                originalText: "1 bote (2,5 kg)",
                value: 2.5,
                unit: "kg"
              }
            },
            {
              id: rIng("stc",2),
              amount: "1–2",
              unit: "",
              name: "cebollas",
              quantity: {
                kind: "range",
                originalText: "1–2 cebollas",
                min: 1,
                max: 2
              }
            },
            {
              id: rIng("stc",3),
              amount: "1",
              unit: "cucharada",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "1 cucharada",
                value: 1,
                unit: "cucharada"
              }
            },
            {
              id: rIng("stc",4),
              amount: "½",
              unit: "cucharada",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "½ cucharada",
                value: 0.5,
                unit: "cucharada"
              }
            },
            {
              id: rIng("stc",5),
              amount: "",
              unit: "",
              name: "AOVE",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [
            {
              id: rStep("stc",1),
              text: "pochar cebolla",
              status: "complete"
            },
            {
              id: rStep("stc",2),
              text: "añadir tomate, sal y azúcar",
              status: "complete"
            },
            {
              id: rStep("stc",3),
              text: "cocer lento 1 h",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "1 h",
                minutes: 60
              }
            },
            {
              id: rStep("stc",4),
              text: "ajustar y triturar opcionalmente",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782908.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Preparación base","Italiano"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-puttanesca"),
          name: "Salsa alla puttanesca",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("put",1),
              amount: "3",
              unit: "cucharadas",
              name: "AOVE",
              quantity: {
                kind: "exact",
                originalText: "3 cucharadas",
                value: 3,
                unit: "cucharadas"
              }
            },
            {
              id: rIng("put",2),
              amount: "2",
              unit: "",
              name: "ajos",
              quantity: {
                kind: "exact",
                originalText: "2",
                value: 2
              }
            },
            {
              id: rIng("put",3),
              amount: "6",
              unit: "",
              name: "anchoas",
              quantity: {
                kind: "exact",
                originalText: "6",
                value: 6
              }
            },
            {
              id: rIng("put",4),
              amount: "700",
              unit: "g",
              name: "tomate",
              quantity: {
                kind: "exact",
                originalText: "700 g",
                value: 700,
                unit: "g"
              }
            },
            {
              id: rIng("put",5),
              amount: "2",
              unit: "cucharadas",
              name: "alcaparras",
              quantity: {
                kind: "exact",
                originalText: "2 cucharadas",
                value: 2,
                unit: "cucharadas"
              }
            },
            {
              id: rIng("put",6),
              amount: "20/25",
              unit: "",
              name: "aceitunas negras",
              quantity: {
                kind: "range",
                originalText: "20/25",
                min: 20,
                max: 25
              }
            },
            {
              id: rIng("put",7),
              amount: "",
              unit: "",
              name: "perejil",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("put",8),
              amount: "",
              unit: "",
              name: "sal y pimienta",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782925.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("put","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Salsa","Italiano","Pasta"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("salsa-tonnata"),
          name: "Salsa tonnata (x2)",
          description: "",
          servings: 2,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "servings",
            originalText: "x2",
            amount: 2,
            unit: "porciones",
            state: "known"
          },
          ingredients: [
            {
              id: rIng("ton",1),
              amount: "440",
              unit: "g",
              name: "atún",
              quantity: {
                kind: "exact",
                originalText: "440 g",
                value: 440,
                unit: "g"
              }
            },
            {
              id: rIng("ton",2),
              amount: "100",
              unit: "ml",
              name: "AOVE",
              quantity: {
                kind: "exact",
                originalText: "100 ml",
                value: 100,
                unit: "ml"
              }
            },
            {
              id: rIng("ton",3),
              amount: "30",
              unit: "g",
              name: "alcaparras",
              quantity: {
                kind: "exact",
                originalText: "30 g",
                value: 30,
                unit: "g"
              }
            },
            {
              id: rIng("ton",4),
              amount: "30",
              unit: "g",
              name: "anchoa",
              quantity: {
                kind: "exact",
                originalText: "30 g",
                value: 30,
                unit: "g"
              }
            },
            {
              id: rIng("ton",5),
              amount: "600",
              unit: "g",
              name: "mayonesa",
              quantity: {
                kind: "exact",
                originalText: "600 g",
                value: 600,
                unit: "g"
              }
            },
            {
              id: rIng("ton",6),
              amount: "50",
              unit: "ml",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "50 ml",
                value: 50,
                unit: "ml"
              }
            }
          ],
          steps: [
            {
              id: rStep("ton",1),
              text: "triturar hasta homogénea y cremosa",
              status: "complete"
            },
            {
              id: rStep("ton",2),
              text: "ajustar sal y mantener frío",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782939.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Italiano","Frío","Pescado"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("crema-de-yema"),
          name: "Crema de yema grasa de rubia gallega",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: 60,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("cy",1),
              amount: "200",
              unit: "g",
              name: "yema pasteurizada",
              quantity: {
                kind: "exact",
                originalText: "200 g",
                value: 200,
                unit: "g"
              }
            },
            {
              id: rIng("cy",2),
              amount: "17",
              unit: "g",
              name: "grasa clarificada",
              quantity: {
                kind: "exact",
                originalText: "17 g",
                value: 17,
                unit: "g"
              }
            },
            {
              id: rIng("cy",3),
              amount: "1",
              unit: "g",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "1 g",
                value: 1,
                unit: "g"
              }
            },
            {
              id: rIng("cy",4),
              amount: "0,25",
              unit: "g",
              name: "xantana",
              quantity: {
                kind: "exact",
                originalText: "0,25 g",
                value: 0.25,
                unit: "g"
              }
            },
            {
              id: rIng("cy",5),
              amount: "3–5",
              unit: "gotas",
              name: "vinagre Jerez",
              quantity: {
                kind: "range",
                originalText: "3–5 gotas",
                min: 3,
                max: 5,
                unit: "gotas"
              }
            }
          ],
          steps: [
            {
              id: rStep("cy",1),
              text: "emulsionar grasa en hilo sobre yema",
              status: "complete"
            },
            {
              id: rStep("cy",2),
              text: "ajustar",
              status: "complete"
            },
            {
              id: rStep("cy",3),
              text: "añadir xantana máximo 5–8 s",
              status: "complete",
              time: {
                kind: "range",
                originalText: "5–8 s",
                minMinutes: 0.083,
                maxMinutes: 0.133
              }
            },
            {
              id: rStep("cy",4),
              text: "envasar y cocinar 69 °C/1 h",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "69 °C",
                value: 69,
                unit: "C"
              },
              time: {
                kind: "duration",
                originalText: "1 h",
                minutes: 60
              }
            },
            {
              id: rStep("cy",5),
              text: "baño hielo y frío 2–3 h",
              status: "complete",
              time: {
                kind: "range",
                originalText: "2–3 h",
                minMinutes: 120,
                maxMinutes: 180
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782959.jpg")
          ],
          uncertainties: [],
          tags: ["Crema","Preparación base","Salsa","Carne"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("pere-en-sirope"),
          name: "Pere en sirope",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("pere",1),
              amount: "1200",
              unit: "g",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "1200 g",
                value: 1200,
                unit: "g"
              }
            },
            {
              id: rIng("pere",2),
              amount: "250",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "250 g",
                value: 250,
                unit: "g"
              }
            },
            {
              id: rIng("pere",3),
              amount: "25",
              unit: "g",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "25 g",
                value: 25,
                unit: "g"
              }
            },
            {
              id: rIng("pere",4),
              amount: "250",
              unit: "g",
              name: "vinagre",
              quantity: {
                kind: "exact",
                originalText: "250 g",
                value: 250,
                unit: "g"
              }
            },
            {
              id: rIng("pere",5),
              amount: "½",
              unit: "",
              name: "azafrán",
              quantity: {
                kind: "exact",
                originalText: "½",
                value: 0.5
              }
            },
            {
              id: rIng("pere",6),
              amount: "2",
              unit: "",
              name: "anís estrellado",
              quantity: {
                kind: "exact",
                originalText: "2",
                value: 2
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285782980.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("pere","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Postre","Dulce","Frutas","Sirope"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("sarde-in-saor"),
          name: "Sarde in saor",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("sarde",1),
              amount: "1",
              unit: "kg",
              name: "sardine",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("sarde",2),
              amount: "",
              unit: "",
              name: "cipolle bianche [cantidad dudosa]",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "Cantidad corregida a mano, parece '1,4 kg', revisar imagen"
              }
            },
            {
              id: rIng("sarde",3),
              amount: "150",
              unit: "ml",
              name: "aceto di vino bianco",
              quantity: {
                kind: "exact",
                originalText: "150 ml",
                value: 150,
                unit: "ml"
              }
            },
            {
              id: rIng("sarde",4),
              amount: "80–100",
              unit: "g",
              name: "farina",
              quantity: {
                kind: "range",
                originalText: "80–100 g",
                min: 80,
                max: 100,
                unit: "g"
              }
            },
            {
              id: rIng("sarde",5),
              amount: "",
              unit: "",
              name: "olio",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("sarde",6),
              amount: "",
              unit: "",
              name: "sale",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("sarde",7),
              amount: "",
              unit: "",
              name: "pepe nero",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("sarde",8),
              amount: "50",
              unit: "g",
              name: "uvetta",
              quantity: {
                kind: "exact",
                originalText: "50 g",
                value: 50,
                unit: "g"
              }
            },
            {
              id: rIng("sarde",9),
              amount: "30",
              unit: "g",
              name: "pinoli",
              quantity: {
                kind: "exact",
                originalText: "30 g",
                value: 30,
                unit: "g"
              }
            },
            {
              id: rIng("sarde",10),
              amount: "2–3",
              unit: "foglie",
              name: "alloro",
              quantity: {
                kind: "range",
                originalText: "2–3 foglie",
                min: 2,
                max: 3,
                unit: "foglie"
              }
            }
          ],
          steps: [
            {
              id: rStep("sarde",1),
              text: "pulire",
              status: "complete"
            },
            {
              id: rStep("sarde",2),
              text: "infarinare e friggere",
              status: "complete"
            },
            {
              id: rStep("sarde",3),
              text: "stufare cipolle 30–40 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "30–40 min",
                minMinutes: 30,
                maxMinutes: 40
              }
            },
            {
              id: rStep("sarde",4),
              text: "aggiungere aceto e aromi",
              status: "complete"
            },
            {
              id: rStep("sarde",5),
              text: "assemblare a strati",
              status: "complete"
            },
            {
              id: rStep("sarde",6),
              text: "riposare almeno 24 h (meglio 48)",
              status: "complete",
              time: {
                kind: "range",
                originalText: "24–48 h",
                minMinutes: 1440,
                maxMinutes: 2880
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285782996.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("sarde","cebolla"),
              fieldPath: "ingredients.onion",
              state: "uncertain",
              note: "Cantidad de cebolla corregida a mano, parece '1,4 kg', revisar imagen 1777285782996.jpg"
            }
          ],
          tags: ["Pescado","Italiano","Frío","Entrante"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("albondigas-cacio-e-ove"),
          name: "Albóndigas cacio e ove",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("alb",1),
              amount: "1",
              unit: "kg",
              name: "pan duro sin corteza",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("alb",2),
              amount: "1,3",
              unit: "kg",
              name: "pecorino fresco/semicurado",
              quantity: {
                kind: "exact",
                originalText: "1,3 kg",
                value: 1.3,
                unit: "kg"
              }
            },
            {
              id: rIng("alb",3),
              amount: "330",
              unit: "g",
              name: "pecorino curado",
              quantity: {
                kind: "exact",
                originalText: "330 g",
                value: 330,
                unit: "g"
              }
            },
            {
              id: rIng("alb",4),
              amount: "20",
              unit: "",
              name: "huevos",
              quantity: {
                kind: "exact",
                originalText: "20",
                value: 20
              }
            },
            {
              id: rIng("alb",5),
              amount: "",
              unit: "",
              name: "perejil opcional",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "opcional"
              }
            },
            {
              id: rIng("alb",6),
              amount: "",
              unit: "",
              name: "sal, pimienta",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("alb",7),
              amount: "",
              unit: "",
              name: "AOVE",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("alb",8),
              amount: "",
              unit: "",
              name: "salsa tomate",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            }
          ],
          steps: [
            {
              id: rStep("alb",1),
              text: "triturar pan grueso",
              status: "complete"
            },
            {
              id: rStep("alb",2),
              text: "mezclar con quesos, huevos y condimentos hasta masa uniforme",
              status: "complete"
            }
          ],
          preparationStatus: "incomplete",
          sections: [],
          references: [],
          sources: [
            img("1777285783009.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("alb","cont"),
              fieldPath: "steps",
              state: "incomplete",
              note: "La imagen no muestra la continuación del procedimiento después de mezclar la masa"
            }
          ],
          tags: ["Carne","Italiano","Caliente","Guiso"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("mayonesa-naranja"),
          name: "Mayonesa naranja",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("mn",1),
              amount: "",
              unit: "",
              name: "zest 1 naranja",
              quantity: {
                kind: "exact",
                originalText: "zest 1 naranja"
              }
            },
            {
              id: rIng("mn",2),
              amount: "100",
              unit: "g",
              name: "leche soja",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("mn",3),
              amount: "300",
              unit: "g",
              name: "aceite semilla",
              quantity: {
                kind: "exact",
                originalText: "300 g",
                value: 300,
                unit: "g"
              }
            },
            {
              id: rIng("mn",4),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("mn",5),
              amount: "",
              unit: "",
              name: "zumo naranja",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("mn",6),
              amount: "",
              unit: "",
              name: "gotas limón",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("mn",1),
              text: "batir zest, leche y aceite hasta sólido",
              status: "complete"
            },
            {
              id: rStep("mn",2),
              text: "ajustar con zumo naranja, sal y limón",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285783029.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Mayonesa","Frío"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("mostaza-x-pastrami"),
          name: "Mostaza x pastrami",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("mxp",1),
              amount: "180",
              unit: "g",
              name: "mostaza Dijon",
              quantity: {
                kind: "exact",
                originalText: "180 g",
                value: 180,
                unit: "g"
              }
            },
            {
              id: rIng("mxp",2),
              amount: "75",
              unit: "g",
              name: "pepinillos",
              quantity: {
                kind: "exact",
                originalText: "75 g",
                value: 75,
                unit: "g"
              }
            },
            {
              id: rIng("mxp",3),
              amount: "6",
              unit: "cucharaditas",
              name: "líquido pepinillos",
              quantity: {
                kind: "exact",
                originalText: "6 cucharaditas",
                value: 6,
                unit: "cucharaditas"
              }
            },
            {
              id: rIng("mxp",4),
              amount: "120/150",
              unit: "g",
              name: "aceite girasol",
              quantity: {
                kind: "range",
                originalText: "120/150 g",
                min: 120,
                max: 150,
                unit: "g"
              }
            },
            {
              id: rIng("mxp",5),
              amount: "1½",
              unit: "cucharadita",
              name: "miel",
              quantity: {
                kind: "exact",
                originalText: "1½ cucharadita",
                value: 1.5,
                unit: "cucharadita"
              }
            },
            {
              id: rIng("mxp",6),
              amount: "",
              unit: "",
              name: "pimienta blanca",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            }
          ],
          steps: [
            {
              id: rStep("mxp",1),
              text: "mezclar base",
              status: "complete"
            },
            {
              id: rStep("mxp",2),
              text: "emulsionar con aceite",
              status: "complete"
            },
            {
              id: rStep("mxp",3),
              text: "ajustar con miel o líquido",
              status: "complete"
            },
            {
              id: rStep("mxp",4),
              text: "añadir pimienta. Textura cremosa, brillante y untuosa",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285783043.jpg")
          ],
          uncertainties: [],
          tags: ["Salsa","Mostaza","Frío","Carne"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("bunuelos-de-parmesano"),
          name: "Buñuelos de parmesano",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("bp",1),
              amount: "3",
              unit: "kg",
              name: "parmesano",
              quantity: {
                kind: "exact",
                originalText: "3 kg",
                value: 3,
                unit: "kg"
              }
            },
            {
              id: rIng("bp",2),
              amount: "1,200",
              unit: "kg",
              name: "clara huevo",
              quantity: {
                kind: "exact",
                originalText: "1,200 kg",
                value: 1.2,
                unit: "kg"
              }
            },
            {
              id: rIng("bp",3),
              amount: "100",
              unit: "g",
              name: "pimentón dulce",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [],
          references: [],
          sources: [
            img("1777285783064.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("bp","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Frito","Queso","Italiano","Guarnición"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("pastrami-salmuera-y-rub"),
          name: "Pastrami — salmuera y rub",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("past",1),
              amount: "2",
              unit: "L",
              name: "agua",
              quantity: {
                kind: "exact",
                originalText: "2 L",
                value: 2,
                unit: "L"
              }
            },
            {
              id: rIng("past",2),
              amount: "100–140",
              unit: "g",
              name: "sal gruesa",
              quantity: {
                kind: "range",
                originalText: "100–140 g",
                min: 100,
                max: 140,
                unit: "g"
              }
            },
            {
              id: rIng("past",3),
              amount: "80–100",
              unit: "g",
              name: "azúcar moreno",
              quantity: {
                kind: "range",
                originalText: "80–100 g",
                min: 80,
                max: 100,
                unit: "g"
              }
            },
            {
              id: rIng("past",4),
              amount: "3–4",
              unit: "g",
              name: "sal cura",
              quantity: {
                kind: "range",
                originalText: "3–4 g",
                min: 3,
                max: 4,
                unit: "g"
              }
            },
            {
              id: rIng("past",5),
              amount: "3–4",
              unit: "",
              name: "ajos",
              quantity: {
                kind: "range",
                originalText: "3–4",
                min: 3,
                max: 4
              }
            },
            {
              id: rIng("past",6),
              amount: "",
              unit: "",
              name: "pimienta, cilantro, mostaza, laurel y clavo",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("past",7),
              amount: "60",
              unit: "g",
              name: "pimentón dulce (rub)",
              quantity: {
                kind: "exact",
                originalText: "60 g",
                value: 60,
                unit: "g"
              }
            },
            {
              id: rIng("past",8),
              amount: "90",
              unit: "g",
              name: "mostaza (rub)",
              quantity: {
                kind: "exact",
                originalText: "90 g",
                value: 90,
                unit: "g"
              }
            },
            {
              id: rIng("past",9),
              amount: "75",
              unit: "g",
              name: "pimentón ahumado (rub)",
              quantity: {
                kind: "exact",
                originalText: "75 g",
                value: 75,
                unit: "g"
              }
            },
            {
              id: rIng("past",10),
              amount: "75",
              unit: "g",
              name: "azúcar moreno (rub)",
              quantity: {
                kind: "exact",
                originalText: "75 g",
                value: 75,
                unit: "g"
              }
            },
            {
              id: rIng("past",11),
              amount: "52,5",
              unit: "g",
              name: "sal (rub)",
              quantity: {
                kind: "exact",
                originalText: "52,5 g",
                value: 52.5,
                unit: "g"
              }
            },
            {
              id: rIng("past",12),
              amount: "30",
              unit: "g",
              name: "ajo polvo (rub)",
              quantity: {
                kind: "exact",
                originalText: "30 g",
                value: 30,
                unit: "g"
              }
            },
            {
              id: rIng("past",13),
              amount: "15",
              unit: "g",
              name: "pimienta blanca (rub)",
              quantity: {
                kind: "exact",
                originalText: "15 g",
                value: 15,
                unit: "g"
              }
            },
            {
              id: rIng("past",14),
              amount: "3",
              unit: "g",
              name: "cilantro polvo (rub)",
              quantity: {
                kind: "exact",
                originalText: "3 g",
                value: 3,
                unit: "g"
              }
            },
            {
              id: rIng("past",15),
              amount: "4,5",
              unit: "g",
              name: "orégano (rub)",
              quantity: {
                kind: "exact",
                originalText: "4,5 g",
                value: 4.5,
                unit: "g"
              }
            },
            {
              id: rIng("past",16),
              amount: "3",
              unit: "g",
              name: "anís polvo (rub)",
              quantity: {
                kind: "exact",
                originalText: "3 g",
                value: 3,
                unit: "g"
              }
            }
          ],
          steps: [
            {
              id: rStep("past",1),
              text: "salmuera: mezclar agua, sales, azúcar, especias y marinar 5–7 días",
              status: "complete",
              time: {
                kind: "range",
                originalText: "5–7 días",
                minMinutes: 7200,
                maxMinutes: 10080
              }
            },
            {
              id: rStep("past",2),
              text: "rub: mezclar todos los ingredientes del rub",
              status: "complete"
            },
            {
              id: rStep("past",3),
              text: "cocción: cámara 110 °C, sonda 93 °C, 20 % humedad",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "110 °C",
                value: 110,
                unit: "C"
              }
            }
          ],
          preparationStatus: "complete",
          sections: [
            {
              id: rSec("past","salmuera"),
              title: "Salmuera (2 L / 1 brisket)",
              kind: "phase",
              ingredients: [],
              steps: [
                {
                  id: rStep("past-ss",1),
                  text: "mezclar agua, sales, azúcar, especias; marinar 5–7 días",
                  status: "complete"
                }
              ],
              referenceIds: []
            },
            {
              id: rSec("past","rub"),
              title: "Rub (½ receta)",
              kind: "phase",
              ingredients: [],
              steps: [
                {
                  id: rStep("past-sr",1),
                  text: "mezclar pimentón, mostaza, azúcar, sal, especias",
                  status: "complete"
                },
                {
                  id: rStep("past-sr",2),
                  text: "cocción: cámara 110 °C, sonda 93 °C, 20 % humedad",
                  status: "complete"
                }
              ],
              referenceIds: []
            }
          ],
          references: [],
          sources: [
            img("1777285783080.jpg")
          ],
          uncertainties: [],
          tags: ["Carne","Ahumado","Americano","Preparación base"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("ensaladilla-rusa"),
          name: "Ensaladilla rusa",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("er",1),
              amount: "3",
              unit: "kg",
              name: "patatas",
              quantity: {
                kind: "exact",
                originalText: "3 kg",
                value: 3,
                unit: "kg"
              }
            },
            {
              id: rIng("er",2),
              amount: "1,200",
              unit: "kg",
              name: "zanahorias",
              quantity: {
                kind: "exact",
                originalText: "1,200 kg",
                value: 1.2,
                unit: "kg"
              }
            },
            {
              id: rIng("er",3),
              amount: "1",
              unit: "kg",
              name: "judía verde",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("er",4),
              amount: "12",
              unit: "",
              name: "huevos",
              quantity: {
                kind: "exact",
                originalText: "12",
                value: 12
              }
            },
            {
              id: rIng("er",5),
              amount: "1",
              unit: "bolsa",
              name: "atún",
              quantity: {
                kind: "exact",
                originalText: "1 bolsa",
                value: 1,
                unit: "bolsa"
              }
            },
            {
              id: rIng("er",6),
              amount: "400",
              unit: "g",
              name: "pepinillos",
              quantity: {
                kind: "exact",
                originalText: "400 g",
                value: 400,
                unit: "g"
              }
            },
            {
              id: rIng("er",7),
              amount: "2–2,5",
              unit: "kg",
              name: "mayonesa",
              quantity: {
                kind: "range",
                originalText: "2–2,5 kg",
                min: 2,
                max: 2.5,
                unit: "kg"
              }
            },
            {
              id: rIng("er",8),
              amount: "10",
              unit: "g/L",
              name: "sal",
              quantity: {
                kind: "exact",
                originalText: "10 g/L",
                value: 10,
                unit: "g/L"
              }
            }
          ],
          steps: [
            {
              id: rStep("er",1),
              text: "cocer patata (35–40 min con piel o 20–25 min pelada)",
              status: "complete",
              time: {
                kind: "range",
                originalText: "35–40 min",
                minMinutes: 35,
                maxMinutes: 40
              }
            },
            {
              id: rStep("er",2),
              text: "cocer judía 8–10 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "8–10 min",
                minMinutes: 8,
                maxMinutes: 10
              }
            },
            {
              id: rStep("er",3),
              text: "cocer huevos 10 min",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "10 min",
                minutes: 10
              }
            },
            {
              id: rStep("er",4),
              text: "enfriar",
              status: "complete"
            },
            {
              id: rStep("er",5),
              text: "mezclar, añadir atún y mayonesa",
              status: "complete"
            },
            {
              id: rStep("er",6),
              text: "conservar <4 °C",
              status: "complete",
              temperature: {
                kind: "exact",
                originalText: "<4 °C",
                value: 4,
                unit: "C"
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285783097.jpg")
          ],
          uncertainties: [],
          tags: ["Ensalada","Frío","Clásico","Guarnición"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("titaina-del-cabanal"),
          name: "Titaina del Cabañal",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("tit",1),
              amount: "5/6",
              unit: "ud",
              name: "pimiento italiano",
              quantity: {
                kind: "range",
                originalText: "5/6 ud",
                min: 5,
                max: 6,
                unit: "ud"
              }
            },
            {
              id: rIng("tit",2),
              amount: "1",
              unit: "ud",
              name: "pimiento rojo",
              quantity: {
                kind: "exact",
                originalText: "1 ud",
                value: 1,
                unit: "ud"
              }
            },
            {
              id: rIng("tit",3),
              amount: "1",
              unit: "ud",
              name: "ajo",
              quantity: {
                kind: "exact",
                originalText: "1 ud",
                value: 1,
                unit: "ud"
              }
            },
            {
              id: rIng("tit",4),
              amount: "2/3",
              unit: "puñados",
              name: "piñones",
              quantity: {
                kind: "range",
                originalText: "2/3 puñados",
                min: 2,
                max: 3,
                unit: "puñados"
              }
            },
            {
              id: rIng("tit",5),
              amount: "2,5",
              unit: "kg",
              name: "salsa tomate",
              quantity: {
                kind: "exact",
                originalText: "2,5 kg",
                value: 2.5,
                unit: "kg"
              }
            },
            {
              id: rIng("tit",6),
              amount: "6",
              unit: "cucharas",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "6 cucharas",
                value: 6,
                unit: "cucharas"
              }
            },
            {
              id: rIng("tit",7),
              amount: "",
              unit: "",
              name: "AOVE",
              quantity: {
                kind: "unknown",
                originalText: "",
                note: "cantidad no indicada"
              }
            },
            {
              id: rIng("tit",8),
              amount: "",
              unit: "",
              name: "sal",
              quantity: {
                kind: "to_taste",
                originalText: "al gusto"
              }
            },
            {
              id: rIng("tit",9),
              amount: "½",
              unit: "lata",
              name: "ventresca atún",
              quantity: {
                kind: "exact",
                originalText: "½ lata",
                value: 0.5,
                unit: "lata"
              }
            }
          ],
          steps: [
            {
              id: rStep("tit",1),
              text: "sofreír pimientos, ajo y piñones",
              status: "complete"
            },
            {
              id: rStep("tit",2),
              text: "añadir tomate y azúcar y cocer 30/45 min",
              status: "complete",
              time: {
                kind: "range",
                originalText: "30/45 min",
                minMinutes: 30,
                maxMinutes: 45
              }
            },
            {
              id: rStep("tit",3),
              text: "ajustar sal y añadir ventresca",
              status: "complete"
            },
            {
              id: rStep("tit",4),
              text: "enfriar, reposar 24–36 h",
              status: "complete",
              time: {
                kind: "range",
                originalText: "24–36 h",
                minMinutes: 1440,
                maxMinutes: 2160
              }
            },
            {
              id: rStep("tit",5),
              text: "limpiar retirando mezcla y secar",
              status: "complete"
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285783114.jpg"),
            img("1777285783162.jpg")
          ],
          uncertainties: [],
          tags: ["Verdura","Italiano","Frío","Guarnición"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("fresas-con-crema-mascarpone"),
          name: "Fresas con crema de mascarpone y tierra crujiente",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("fres",1),
              amount: "1",
              unit: "kg",
              name: "fresas",
              quantity: {
                kind: "exact",
                originalText: "1 kg",
                value: 1,
                unit: "kg"
              }
            },
            {
              id: rIng("fres",2),
              amount: "80",
              unit: "g",
              name: "azúcar (fresas)",
              quantity: {
                kind: "exact",
                originalText: "80 g",
                value: 80,
                unit: "g"
              }
            },
            {
              id: rIng("fres",3),
              amount: "1",
              unit: "",
              name: "limón",
              quantity: {
                kind: "exact",
                originalText: "1",
                value: 1
              }
            },
            {
              id: rIng("fres",4),
              amount: "500",
              unit: "g",
              name: "mascarpone",
              quantity: {
                kind: "exact",
                originalText: "500 g",
                value: 500,
                unit: "g"
              }
            },
            {
              id: rIng("fres",5),
              amount: "200",
              unit: "ml",
              name: "nata",
              quantity: {
                kind: "exact",
                originalText: "200 ml",
                value: 200,
                unit: "ml"
              }
            },
            {
              id: rIng("fres",6),
              amount: "80",
              unit: "g",
              name: "azúcar glas",
              quantity: {
                kind: "exact",
                originalText: "80 g",
                value: 80,
                unit: "g"
              }
            },
            {
              id: rIng("fres",7),
              amount: "",
              unit: "",
              name: "ralladura limón o 1 cdta vainilla",
              quantity: {
                kind: "exact",
                originalText: "ralladura limón o 1 cdta vainilla"
              }
            },
            {
              id: rIng("fres",8),
              amount: "120",
              unit: "g",
              name: "mantequilla (tierra)",
              quantity: {
                kind: "exact",
                originalText: "120 g",
                value: 120,
                unit: "g"
              }
            },
            {
              id: rIng("fres",9),
              amount: "120",
              unit: "g",
              name: "harina (tierra)",
              quantity: {
                kind: "exact",
                originalText: "120 g",
                value: 120,
                unit: "g"
              }
            },
            {
              id: rIng("fres",10),
              amount: "100",
              unit: "g",
              name: "azúcar moreno (tierra)",
              quantity: {
                kind: "exact",
                originalText: "100 g",
                value: 100,
                unit: "g"
              }
            },
            {
              id: rIng("fres",11),
              amount: "",
              unit: "",
              name: "pizca sal (tierra)",
              quantity: {
                kind: "to_taste",
                originalText: "pizca"
              }
            }
          ],
          steps: [],
          preparationStatus: "absent",
          sections: [
            {
              id: rSec("fres","fr"),
              title: "Fresas",
              kind: "component",
              ingredients: [],
              steps: [],
              referenceIds: []
            },
            {
              id: rSec("fres","cr"),
              title: "Crema de mascarpone",
              kind: "component",
              ingredients: [],
              steps: [],
              referenceIds: []
            },
            {
              id: rSec("fres","ti"),
              title: "Tierra crujiente",
              kind: "component",
              ingredients: [],
              steps: [],
              referenceIds: []
            }
          ],
          references: [],
          sources: [
            img("1777285783131.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("fres","prep"),
              fieldPath: "steps",
              state: "unknown",
              note: "Preparación no visible en la imagen"
            }
          ],
          tags: ["Postre","Dulce","Fruta","Frío"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("caponata"),
          name: "Caponata",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("cap",1),
              amount: "12",
              unit: "",
              name: "berenjenas",
              quantity: {
                kind: "exact",
                originalText: "12",
                value: 12
              }
            },
            {
              id: rIng("cap",2),
              amount: "1",
              unit: "",
              name: "apio",
              quantity: {
                kind: "exact",
                originalText: "1",
                value: 1
              }
            },
            {
              id: rIng("cap",3),
              amount: "6",
              unit: "",
              name: "cebollas",
              quantity: {
                kind: "exact",
                originalText: "6",
                value: 6
              }
            },
            {
              id: rIng("cap",4),
              amount: "600",
              unit: "g",
              name: "aceitunas",
              quantity: {
                kind: "exact",
                originalText: "600 g",
                value: 600,
                unit: "g"
              }
            },
            {
              id: rIng("cap",5),
              amount: "300",
              unit: "g",
              name: "alcaparras",
              quantity: {
                kind: "exact",
                originalText: "300 g",
                value: 300,
                unit: "g"
              }
            },
            {
              id: rIng("cap",6),
              amount: "300",
              unit: "g",
              name: "azúcar",
              quantity: {
                kind: "exact",
                originalText: "300 g",
                value: 300,
                unit: "g"
              }
            },
            {
              id: rIng("cap",7),
              amount: "250",
              unit: "ml",
              name: "vinagre",
              quantity: {
                kind: "exact",
                originalText: "250 ml",
                value: 250,
                unit: "ml"
              }
            },
            {
              id: rIng("cap",8),
              amount: "1",
              unit: "",
              name: "concentrado tomate",
              quantity: {
                kind: "exact",
                originalText: "1 concentrado"
              }
            },
            {
              id: rIng("cap",9),
              amount: "700",
              unit: "ml",
              name: "tomate cristal",
              quantity: {
                kind: "exact",
                originalText: "700 ml",
                value: 700,
                unit: "ml"
              }
            }
          ],
          steps: [
            {
              id: rStep("cap",1),
              text: "pelar/freír berenjena sin quemar",
              status: "complete"
            },
            {
              id: rStep("cap",2),
              text: "pochar cebolla",
              status: "complete"
            },
            {
              id: rStep("cap",3),
              text: "cocer apio al vapor 10 min",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "10 min",
                minutes: 10
              }
            },
            {
              id: rStep("cap",4),
              text: "añadir cebolla y reducir",
              status: "complete"
            },
            {
              id: rStep("cap",5),
              text: "añadir tomate, aceitunas, azúcar y alcaparras",
              status: "complete"
            },
            {
              id: rStep("cap",6),
              text: "mezclar con berenjenas y cocinar 1 h lento",
              status: "complete",
              time: {
                kind: "duration",
                originalText: "1 h",
                minutes: 60
              }
            }
          ],
          preparationStatus: "complete",
          sections: [],
          references: [],
          sources: [
            img("1777285783147.jpg")
          ],
          uncertainties: [],
          tags: ["Verdura","Italiano","Guarnición","Frío"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        },
        {
          schemaVersion: 2,
          id: rId("gravlax-de-bonito"),
          name: "Gravlax de bonito",
          description: "",
          servings: null,
          prepMinutes: null,
          cookMinutes: null,
          yield: {
            kind: "unknown",
            originalText: "",
            state: "unknown"
          },
          ingredients: [
            {
              id: rIng("grav",1),
              amount: "200",
              unit: "g",
              name: "sal gruesa (por kg bonito)",
              quantity: {
                kind: "exact",
                originalText: "200 g/kg",
                value: 200,
                unit: "g"
              }
            },
            {
              id: rIng("grav",2),
              amount: "200",
              unit: "g",
              name: "azúcar (por kg bonito)",
              quantity: {
                kind: "exact",
                originalText: "200 g/kg",
                value: 200,
                unit: "g"
              }
            },
            {
              id: rIng("grav",3),
              amount: "1",
              unit: "manojo",
              name: "eneldo",
              quantity: {
                kind: "exact",
                originalText: "1 manojo",
                value: 1,
                unit: "manojo"
              }
            },
            {
              id: rIng("grav",4),
              amount: "",
              unit: "",
              name: "ralladura 1 limón",
              quantity: {
                kind: "exact",
                originalText: "ralladura 1 limón"
              }
            },
            {
              id: rIng("grav",5),
              amount: "1",
              unit: "cucharada",
              name: "pimienta negra",
              quantity: {
                kind: "exact",
                originalText: "1 cucharada",
                value: 1,
                unit: "cucharada"
              }
            }
          ],
          steps: [
            {
              id: rStep("grav",1),
              text: "limpiar y secar",
              status: "complete"
            },
            {
              id: rStep("grav",2),
              text: "mezclar cura",
              status: "complete"
            },
            {
              id: rStep("grav",3),
              text: "montar con capa fina",
              status: "complete"
            }
          ],
          preparationStatus: "incomplete",
          sections: [],
          references: [],
          sources: [
            img("1777285783176.jpg")
          ],
          uncertainties: [
            {
              id: rUnc("grav","cont"),
              fieldPath: "steps",
              state: "incomplete",
              note: "La imagen no muestra la continuación del procedimiento después de montar la cura"
            }
          ],
          tags: ["Pescado","Frío","Marinado","Nórdico"],
          favorite: false,
          createdAt: TS,
          updatedAt: TS,
        }
  ];
  return raw.map((r) => {
    const asignada = Object.entries(CATEGORIA_RECETA).find(([k]) => r.id === rId(k));
    return asignada ? { ...r, tags: asignada[1] } : r;
  });
}
