// Drivers de animação "draw-on" (trim-path) do b-mark.
//
// Linhas-guia ABERTAS (início → fim) traçadas ao longo do eixo medial da marca.
// A ideia: estrique cada path com trim-path (`stroke-dashoffset`, com
// `pathLength={1}`) dentro de uma MÁSCARA aplicada sobre o `MARK_PATH` oficial
// preenchido. Conforme o traço cresce, ele revela a marca real ao longo da
// espinha — então toda a espessura é a oficial e o frame final é **100%
// idêntico** à marca (não é um "monoline"). Ver a página de marca nos docs.
//
// As larguras são "de máscara": ≥ a espessura local da marca, o suficiente para
// a máscara cobrir 100% do `MARK_PATH` (o excesso é recortado pela própria
// marca). Derivadas offline do bitmap da marca — por isso são literais (não dá
// para re-derivar em runtime sem rasterizar). Mesmo espaço do `MARK_VIEWBOX`.

/**
 * Traço do "b": topo da haste → espiral do anel externo (path aberto, ordenado
 * para o draw-on). Estrique com `stroke-linecap`/`linejoin` "round". A largura
 * de máscara é {@link MARK_STROKE_WIDTH}.
 */
export const MARK_STROKE_PATH =
  "M 126.00 120.00 C 125.99 156.88, 125.97 272.95, 125.94 341.25 C 125.91 409.55, 125.79 475.83, 125.82 529.81 C 125.85 583.79, 125.91 628.28, 126.11 665.11 C 126.30 701.94, 126.76 726.97, 126.99 750.80 C 127.21 774.63, 127.46 790.85, 127.46 808.10 C 127.47 825.34, 127.14 839.57, 127.00 854.28 C 126.86 868.99, 126.52 882.54, 126.63 896.37 C 126.73 910.20, 126.89 923.67, 127.64 937.27 C 128.40 950.88, 129.38 964.48, 131.16 977.99 C 132.94 991.50, 135.22 1005.02, 138.31 1018.34 C 141.39 1031.67, 145.18 1044.94, 149.69 1057.92 C 154.21 1070.89, 159.47 1083.73, 165.41 1096.18 C 171.35 1108.64, 178.04 1120.86, 185.33 1132.66 C 192.61 1144.46, 200.61 1155.94, 209.13 1166.97 C 217.64 1178.01, 226.79 1188.68, 236.41 1198.87 C 246.02 1209.06, 256.20 1218.86, 266.84 1228.10 C 277.47 1237.34, 288.62 1246.17, 300.20 1254.31 C 311.78 1262.45, 323.86 1270.10, 336.32 1276.95 C 348.77 1283.81, 361.71 1290.04, 374.92 1295.46 C 388.13 1300.88, 401.77 1305.56, 415.56 1309.49 C 429.35 1313.41, 443.47 1316.57, 457.66 1319.00 C 471.84 1321.43, 486.26 1323.11, 500.67 1324.04 C 515.08 1324.97, 529.64 1325.16, 544.11 1324.59 C 558.59 1324.02, 573.15 1322.71, 587.52 1320.60 C 601.89 1318.50, 616.27 1315.65, 630.35 1311.97 C 644.43 1308.29, 658.41 1303.80, 671.99 1298.52 C 685.57 1293.24, 698.94 1287.11, 711.83 1280.28 C 724.71 1273.46, 737.27 1265.80, 749.32 1257.57 C 761.37 1249.34, 773.01 1240.35, 784.11 1230.89 C 795.22 1221.42, 805.89 1211.32, 815.96 1200.77 C 826.03 1190.22, 835.64 1179.12, 844.55 1167.59 C 853.46 1156.07, 861.83 1144.02, 869.42 1131.61 C 877.00 1119.20, 883.94 1106.29, 890.05 1093.12 C 896.17 1079.95, 901.54 1066.34, 906.10 1052.59 C 910.66 1038.84, 914.42 1024.74, 917.42 1010.61 C 920.41 996.47, 922.59 982.10, 924.07 967.76 C 925.55 953.43, 926.27 938.97, 926.29 924.61 C 926.32 910.25, 925.64 895.84, 924.22 881.60 C 922.80 867.37, 920.68 853.15, 917.78 839.20 C 914.88 825.25, 911.22 811.40, 906.82 797.90 C 902.42 784.41, 897.24 771.10, 891.38 758.23 C 885.53 745.36, 878.90 732.77, 871.70 720.68 C 864.49 708.58, 856.56 696.86, 848.15 685.65 C 839.74 674.44, 830.68 663.66, 821.22 653.41 C 811.76 643.16, 801.76 633.36, 791.38 624.14 C 781.00 614.92, 770.16 606.18, 758.96 598.08 C 747.77 589.98, 736.13 582.42, 724.21 575.57 C 712.28 568.71, 699.95 562.47, 687.41 556.97 C 674.87 551.47, 661.98 546.65, 648.97 542.57 C 635.96 538.50, 622.67 535.17, 609.35 532.51 C 596.04 529.85, 582.54 528.00, 569.07 526.62 C 555.60 525.23, 542.06 524.66, 528.54 524.19 C 515.03 523.72, 494.74 523.85, 487.98 523.78";

/** Largura de máscara do traço do "b" (cobre haste + anel externo a 100%). */
export const MARK_STROKE_WIDTH = 270;

/**
 * Traço do círculo interno (anel central) — path aberto (círculo, início no
 * topo), também animável por trim-path. Largura de máscara:
 * {@link MARK_INNER_STROKE_WIDTH}.
 */
export const MARK_INNER_STROKE_PATH =
  "M 515 762.5 A 147.5 147.5 0 1 1 515 1057.5 A 147.5 147.5 0 1 1 515 762.5";

/** Largura de máscara do traço do círculo interno (cobre o anel central a 100%). */
export const MARK_INNER_STROKE_WIDTH = 120;
