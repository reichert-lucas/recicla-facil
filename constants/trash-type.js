export const TRASH_TYPE = {
    RECYCLABLE: 1,
    ORGANIC: 2,
    ELECTRONIC: 3,
    CHEMICAL: 4,
    CONSTRUCTION: 5,
    HOSPITAL: 6,
}

export const TRASH_TYPE_LABELS = {
    [TRASH_TYPE.RECYCLABLE]: 'Resíduos Recicláveis',
    [TRASH_TYPE.ORGANIC]: 'Resíduos Orgânicos',
    [TRASH_TYPE.ELECTRONIC]: 'Resíduos Eletrônicos',
    [TRASH_TYPE.CHEMICAL]: 'Resíduos Perigosos',
    [TRASH_TYPE.CONSTRUCTION]: 'Resíduos de Construções',
    [TRASH_TYPE.HOSPITAL]: 'Resíduos Hospitalares',
}

export const TRASH_TYPE_DESCRIPTIONS = {
    [TRASH_TYPE.RECYCLABLE]: 'papel, papelão, plástico, vidro e metal',
    [TRASH_TYPE.ORGANIC]: 'restos de alimentos e resíduos da jardinagem',
    [TRASH_TYPE.ELECTRONIC]: 'computadores, celulares, eletrodomésticos, baterias e pilhas',
    [TRASH_TYPE.CHEMICAL]: 'solventes, óleos, tintas e produtos químicos no geral',
    [TRASH_TYPE.CONSTRUCTION]: 'concreto, madeira e outros materiais de construção',
    [TRASH_TYPE.HOSPITAL]: 'remédios, seringas, gazes, bisturís e outros',
}

export const TRASH_TYPE_COLLECTOR_RECEIVE = {
    [TRASH_TYPE.RECYCLABLE]: false,
    [TRASH_TYPE.ORGANIC]: true,
    [TRASH_TYPE.ELECTRONIC]: false,
    [TRASH_TYPE.CHEMICAL]: true,
    [TRASH_TYPE.CONSTRUCTION]: true,
    [TRASH_TYPE.HOSPITAL]: true,
}