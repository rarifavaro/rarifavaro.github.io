const whatsappNumber = "5521975003419";
const whatsappUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const state = {
  step: "identity", birthName: "", dailyName: "", birthDate: "",
  answers: { area: "", repetition: "", pressure: "", energy: "", nameFeeling: "", desire: "", readiness: "", centralQuestion: "" }
};

const groups = { 1: "AIJQY", 2: "BKR", 3: "CGLS", 4: "DMT", 5: "EHN", 6: "UVWXÇ", 7: "OZ", 8: "FP" };
const baseValues = {};
Object.entries(groups).forEach(([value, letters]) => [...letters].forEach((letter) => { baseValues[letter] = Number(value); }));
const accents = {
  Á:["A","add",2], É:["E","add",2], Í:["I","add",2], Ó:["O","add",2], Ú:["U","add",2],
  Ã:["A","add",3], Õ:["O","add",3], Â:["A","add",7], Ê:["E","add",7], Ô:["O","add",7],
  À:["A","double",0], È:["E","double",0], Ì:["I","double",0], Ò:["O","double",0], Ù:["U","double",0],
  Ä:["A","double",0], Ë:["E","double",0], Ï:["I","double",0], Ö:["O","double",0], Ü:["U","double",0]
};
const apostilaReadings = {
  "Motivação": {
    "1": [
      "A sua Motivação 1 deseja independência, liderança e liberdade para conduzir a própria vida. Existe uma força antiga de afirmação do Eu, como se a sua alma já conhecesse o lugar de comando e agora quisesse continuar avançando, criando, decidindo e abrindo caminhos. Você precisa sentir que está construindo algo próprio e que não vive submetido à vontade alheia.",
      "Na sombra, essa necessidade de autonomia pode virar arrogância, egoísmo, impaciência, agressividade ou dificuldade de ouvir. Quando inseguro, você pode endurecer, ameaçar, ofender ou se tornar vingativo. O caminho do 1 é sustentar poder pessoal com consciência espiritual, dignidade, cultura e respeito pelo espaço do outro."
    ],
    "2": [
      "A sua Motivação 2 busca paz, equilíbrio, amor, compreensão e relações em que exista verdadeira cooperação. Você tende a desejar harmonia ao redor e pode sentir profundamente o ambiente e as pessoas. Existe uma natureza conciliadora, sensível e devotada, que encontra sentido em unir, servir e construir vínculos leais sem precisar ocupar o centro de tudo.",
      "Na sombra, essa sensibilidade pode virar passividade, indecisão e dependência da aprovação ou da direção dos outros. Você pode se deixar influenciar, evitar escolhas, se recolher ou se deprimir quando não se sente compreendido. O 2 pede que a sua delicadeza não custe a própria voz: paz também exige presença, comunicação e limite."
    ],
    "3": [
      "A sua Motivação 3 deseja expressão, beleza, criatividade, prazer e reconhecimento. Existe uma necessidade profunda de falar, criar, circular, imaginar e tocar as pessoas através daquilo que você sente e produz. A intuição e a inspiração participam desse movimento, e a sua força mental pode ser intensa. Você precisa sentir que a vida tem cor, movimento e espaço para a sua individualidade criativa.",
      "Na sombra, o desejo de aprovação pode virar dispersão, exagero, compras impulsivas, mentira, teatralização ou dificuldade de concluir o que começa. Você também pode assumir compromissos demais ou usar o humor para escapar do que incomoda. O 3 pede concentração e responsabilidade para que talento, intuição e palavra não sejam desperdiçados."
    ],
    "4": [
      "A sua Motivação 4 deseja ordem, segurança, verdade, lealdade e conquistas construídas sobre bases sólidas. Você precisa sentir que pode confiar no chão que pisa e tende a valorizar disciplina, ética, trabalho bem feito e estabilidade material. Existe uma alma que prefere o real ao enfeite e que encontra dignidade em construir algo que permaneça.",
      "Na sombra, a necessidade de segurança pode virar rigidez, obsessão, pessimismo, acúmulo, controle e medo do novo. Você pode tentar prever tudo para não ser surpreendido. O 4 pede que a estrutura não vire prisão. Suas conquistas crescem quando disciplina e prosperidade também encontram propósito, humanidade e abertura para a vida."
    ],
    "5": [
      "A sua Motivação 5 deseja liberdade, movimento, novidade, experiências e contato direto com a vida. Existe uma alma curiosa, investigadora e inquieta, que aprende viajando, experimentando, conhecendo pessoas e descobrindo caminhos que ainda não foram tentados. Filosofia, experiência e expansão de horizontes alimentam profundamente essa vibração.",
      "Na sombra, a liberdade pode virar fuga, ruptura impulsiva, excesso, escândalo, riscos desnecessários ou exageros com bebida, sexo e estímulos. Você pode abandonar rapidamente aquilo que começa a incomodar. O 5 pede liberdade com consciência: viver intensamente sem se perder de si, transformar experiência em conhecimento e novidade em evolução."
    ],
    "6": [
      "A sua Motivação 6 deseja amor, família, união, beleza, proteção e a sensação de ser necessário. Você tende a querer cuidar, ensinar, acolher e criar harmonia para quem ama. Existe sensibilidade para o milagre da vida, para aquilo que cresce e para a presença do amor nas pequenas coisas. Sua alma busca raízes, pertencimento e relações que tenham sentido.",
      "Na sombra, o cuidado pode virar controle, sentimentalismo, apego ao passado, manipulação ou necessidade de resolver a vida de todos. Quando perde confiança, pode atrair relações confusas e tentar manter vínculos pelo medo. O 6 pede amor com liberdade, espiritualidade com maturidade e cuidado sem transformar afeto em posse ou sacrifício."
    ],
    "7": [
      "A sua Motivação 7 deseja profundidade, silêncio, sabedoria e contato com aquilo que existe além da superfície. Você precisa de momentos de solidão para explorar a própria alma, pensar, pesquisar, meditar e compreender o invisível. Existe forte intuição, percepção refinada, espiritualidade e possibilidade de interesse por realidades não físicas. O superficial dificilmente te satisfaz.",
      "Na sombra, essa profundidade pode virar isolamento, frieza, excesso de análise, desconfiança, intolerância ou necessidade de explicar tudo racionalmente. Você pode se fechar quando não se sente compreendido. O 7 pede que o silêncio seja templo, não esconderijo, e que a busca espiritual aprofunde sua relação com a vida em vez de afastá-lo dela."
    ],
    "8": [
      "A sua Motivação 8 busca poder pessoal, realização e prosperidade material. Você não deseja viver pequeno. Existe necessidade de construir, crescer, organizar e conquistar segurança através daquilo que faz. Você tende a enxergar oportunidades, pessoas e situações com objetividade e pode ter forte percepção para negócios, dinheiro, liderança e grandes realizações.",
      "Na sombra, essa força pode virar controle, rigidez, medo de perder, ganância, exploração ou necessidade de dominar tudo ao redor. Quando inseguro, você pode esmagar concorrências, se fechar ao risco ou usar poder sem ética. O 8 pede que riqueza, autoridade e influência caminhem com justiça, consciência e responsabilidade."
    ],
    "9": [
      "A sua Motivação 9 deseja compreender a vida em escala maior. Existe uma alma voltada para conhecimento, intuição, amor universal, espiritualidade e serviço à humanidade. Você pode sentir necessidade de aconselhar, ensinar, elevar, proteger ou contribuir com algo que ultrapasse a própria história. O 9 busca os vínculos que unem os seres humanos e pode perceber dimensões que outras pessoas não percebem.",
      "Na sombra, essa amplitude pode virar fanatismo, manipulação, vitimização, apatia, sensação de ser iluminado demais para os outros ou dificuldade de permanecer no cotidiano. Você pode querer salvar o mundo e perder a própria direção. O 9 pede compaixão sem superioridade e consciência espiritual sem abandono da vida concreta."
    ],
    "11": [
      "A sua Motivação 11 deseja evolução espiritual, inspiração e desenvolvimento de um poder pessoal muito sensível e intuitivo. Existe aqui uma vibração visionária, capaz de perceber além do evidente e de buscar respostas sobre vida, morte, consciência e propósito. Você pode sentir necessidade de reconhecimento, mas também de usar seus talentos para algo que considere mais elevado.",
      "Na sombra, tanta sensibilidade pode virar nervosismo, instabilidade emocional, egocentrismo, paranoia, afastamento, avareza ou depressão. O 11 pede discernimento para não confundir intuição com medo ou ideal com vaidade. Quando encontra equilíbrio, sua sensibilidade deixa de ser peso e se transforma em inspiração, sabedoria e presença."
    ],
    "22": [
      "A sua Motivação 22 deseja construir em grande escala. Existe uma alma que combina visão espiritual, capacidade material, organização, diplomacia e desejo de deixar algo concreto para o mundo. Você pode sentir que não basta realizar apenas para si: há uma necessidade de criar estruturas, projetos ou caminhos que tenham alcance coletivo e permaneçam depois de você.",
      "Na sombra, essa potência pode virar ganância, exploração, corrupção, manipulação, rancor ou destruição em grande escala. O 22 exige maturidade porque amplia tanto a criação quanto o erro. Sua força cresce quando poder material, inspiração e capacidade administrativa são colocados a serviço da humanidade sem que você se abandone."
    ]
  },
  "Impressão": {
    "1": [
      "A sua Impressão 1 faz você chegar aos ambientes com energia de independência, decisão e liderança. As pessoas podem te perceber como alguém forte, direto, autoconfiante e capaz de assumir o controle quando é preciso. Existe uma presença que se diferencia da multidão e transmite iniciativa, coragem e vontade própria.",
      "Na sombra, essa mesma presença pode parecer agressiva, dominadora, egoísta ou pouco disponível para ouvir. Você pode causar a impressão de que precisa vencer sempre ou de que não necessita de ninguém. O 1 projeta força, mas a forma como essa força toca o outro depende de quanto existe de consciência por trás dela."
    ],
    "2": [
      "A sua Impressão 2 transmite sensibilidade, delicadeza, diplomacia e uma necessidade visível de harmonia. As pessoas podem te perceber como alguém gentil, cooperativo, pacífico e atento ao que acontece ao redor. Existe uma presença discreta que inspira confiança e pode fazer com que os outros sintam que serão ouvidos e acolhidos.",
      "Na sombra, você pode parecer indeciso, passivo, tímido ou dependente demais de companhia e aprovação. Às vezes, a sua suavidade esconde uma força que demora a aparecer. O 2 pede que a imagem de paz não apague sua capacidade de escolher, inovar e ocupar espaço."
    ],
    "3": [
      "A sua Impressão 3 transmite juventude, expressão, criatividade e magnetismo social. As pessoas tendem a perceber alguém comunicativo, espirituoso, persuasivo e capaz de trazer leveza para os ambientes. Existe talento para chamar atenção, encantar, criar beleza e colocar sentimento em palavras, gestos ou presença.",
      "Na sombra, essa imagem pode parecer superficial, infantil, negligente ou dependente demais de aplauso. Quando frustrado, sua autoestima pode cair rapidamente e emoções intensas podem desorganizar seu senso de medida. O 3 brilha com naturalidade quando não precisa transformar cada encontro em palco."
    ],
    "4": [
      "A sua Impressão 4 transmite solidez, responsabilidade e confiabilidade. As pessoas podem te perceber como alguém prático, disciplinado, resistente, honesto e capaz de sustentar tarefas que outros abandonariam. Sua presença passa segurança, ordem e a sensação de que existe estrutura por trás do que você diz e faz.",
      "Na sombra, você pode parecer rígido, conservador, exigente ou difícil de compreender quando algo foge do conhecido. A busca por segurança pode deixar sua imagem séria demais. O 4 projeta força de construção, mas cresce quando disciplina e autoridade deixam espaço para humanidade e flexibilidade."
    ],
    "5": [
      "A sua Impressão 5 faz você parecer diferente, inquieto, magnético e difícil de enquadrar. As pessoas podem perceber alguém que busca novidade, movimento, prazer e novas maneiras de fazer as coisas. Existe uma presença jovem, curiosa, sedutora e versátil, que chama atenção porque não parece disposta a seguir todos os caminhos já prontos.",
      "Na sombra, essa energia pode parecer instável, impulsiva ou difícil de acompanhar. O magnetismo pode atrair relações intensas, simpatias e antipatias com a mesma facilidade. O 5 projeta liberdade e mudança, e sua força aparece quando essa liberdade não vira desordem ou necessidade constante de estímulo."
    ],
    "6": [
      "A sua Impressão 6 transmite acolhimento, cuidado, beleza e uma presença quase familiar. As pessoas podem te perceber como alguém capaz de aconselhar, ensinar, proteger e criar conforto. Existe uma vibração amorosa e social que faz os outros se aproximarem buscando orientação, segurança ou simplesmente um lugar onde possam baixar a guarda.",
      "Na sombra, esse campo pode misturar cuidado com controle, sedução com dependência e amor com necessidade de ser indispensável. O 6 também carrega paixões fortes e pode oscilar entre virtude e excesso. Sua presença é mais bonita quando acolhe sem invadir e ama sem transformar o vínculo em obrigação."
    ],
    "7": [
      "A sua Impressão 7 cria um ar de mistério, profundidade e distância. As pessoas podem sentir que existe muito mais em você do que aquilo que mostra. Você tende a parecer observador, intelectual, místico, seletivo e difícil de acessar rapidamente. Existe uma presença que transmite especialização, introspecção e busca por algo além do óbvio.",
      "Na sombra, essa reserva pode parecer frieza, segredo, superioridade ou isolamento. Nem todo mundo consegue entender sua necessidade de silêncio, e você pode parecer inacessível quando está apenas preservando o próprio mundo interno. O 7 projeta sabedoria quando o mistério não se transforma em muro."
    ],
    "8": [
      "A sua Impressão 8 transmite poder, autoridade e capacidade de decisão. As pessoas podem perceber alguém que sabe ocupar espaço, organizar recursos e lidar com estruturas de poder. Existe uma presença executiva, forte e controlada, que pode passar segurança material, ambição e capacidade de comando mesmo quando sua vida interna está atravessando desafios.",
      "Na sombra, essa imagem pode parecer fria, calculista, ostentadora ou manipuladora. Feridas no orgulho podem trazer mau humor e necessidade de provar valor. O 8 projeta poder naturalmente; o desafio é fazer com que esse poder seja percebido como autoridade consciente, não como domínio."
    ],
    "9": [
      "A sua Impressão 9 transmite humanidade, compaixão e um magnetismo que alcança pessoas muito diferentes. Você pode parecer alguém capaz de compreender além da superfície, perdoar, acolher e olhar a vida de forma ampla. Existe uma presença humanitária, sensível e generosa que pode fazer com que os outros procurem você para conforto, conselho ou orientação.",
      "Na sombra, essa imagem pode colocar sobre você expectativas de disponibilidade e salvação. Você pode parecer tão aberto ao coletivo que as pessoas esqueçam que também existem limites, desejos e necessidades pessoais aí dentro. O 9 acolhe o mundo, mas não precisa pertencer a todos que chegam."
    ]
  },
  "Expressão": {
    "1": [
      "A sua Expressão 1 coloca no mundo uma força independente, pioneira e criadora. Existe em você uma necessidade de afirmar o próprio Eu, iniciar caminhos e conduzir aquilo em que acredita. Liderança, coragem, originalidade e capacidade de decisão fazem parte da forma como sua consciência busca se manifestar.",
      "Na sombra, essa força pode virar egocentrismo, autoritarismo, agressividade e dificuldade de cooperação. Você pode acreditar que precisa fazer tudo sozinho ou que os outros devem acompanhar seu ritmo. O 1 se realiza quando lidera sem destruir a individualidade alheia e usa sua força para abrir caminhos, não para ocupar todos eles."
    ],
    "2": [
      "A sua Expressão 2 se manifesta através da sensibilidade, da diplomacia e da capacidade de perceber o outro. Você possui uma força que nem sempre precisa aparecer na frente: ela pode unir pessoas, conciliar conflitos e perceber nuances que passam despercebidas. Cooperação, escuta, afeto e parceria são instrumentos importantes da sua expressão.",
      "Na sombra, essa delicadeza pode virar hesitação, dependência, passividade e dificuldade de tomar decisões. Você pode se sacrificar para preservar relações e depois se sentir diminuído. O 2 precisa aprender que conciliar não é desaparecer. Sua presença fica inteira quando harmonia e posicionamento caminham juntos."
    ],
    "3": [
      "A sua Expressão 3 coloca no mundo criatividade, palavra, imaginação e capacidade de contagiar ambientes. Existe uma força espiritual de criação que encontra passagem na comunicação, nas artes, na alegria e na forma como você transforma experiências em expressão. Você pode inspirar outras pessoas simplesmente mostrando uma maneira mais viva de enxergar a existência.",
      "Na sombra, medo, pessimismo, dispersão e excesso de interesses podem desperdiçar seus talentos. Você pode começar muitas coisas e perder energia antes de vê-las florescer. O 3 pede que entusiasmo ganhe direção. Quando palavra, arte e espírito caminham juntos, sua expressão se torna presença que ilumina e movimenta."
    ],
    "4": [
      "A sua Expressão 4 se manifesta pela construção, disciplina e necessidade de transformar ideias em algo concreto. Você tende a confiar no que pode ser provado, organizado e sustentado no tempo. Existe força para trabalhar, administrar, estruturar e produzir resultados palpáveis. O 4 é uma energia de chão, responsabilidade e permanência.",
      "Na sombra, essa firmeza pode virar dureza, teimosia, resistência ao novo e excesso de cobrança consigo e com os outros. Você pode confundir segurança com controle. O 4 cresce quando entende que construir também exige adaptação, confiança e humanidade, e que uma estrutura viva precisa respirar."
    ],
    "5": [
      "A sua Expressão 5 se manifesta através da mudança, da liberdade e da capacidade de encontrar caminhos novos. Você tem talento para romper padrões, experimentar possibilidades e apresentar ideias diferentes de forma compreensível. Comunicação, viagens, movimento e contato com pessoas podem ampliar muito aquilo que você veio expressar.",
      "Na sombra, a necessidade de novidade pode virar dispersão, impaciência e abandono de projetos antes da conclusão. Você pode acreditar que liberdade significa nunca permanecer. O 5 se fortalece quando transforma mudança em progresso e experiência em consciência, sem precisar fugir de tudo que começa a criar raízes."
    ],
    "6": [
      "A sua Expressão 6 se manifesta pelo cuidado, pela associação e pela busca de harmonia. Família, comunidade, educação, beleza e proteção são territórios importantes dessa vibração. Você tende a perceber o todo e a encontrar maneiras de fazer pessoas diferentes coexistirem. Existe uma natureza afetiva, responsável e capaz de ensinar pelo vínculo.",
      "Na sombra, você pode assumir responsabilidades demais, exigir reciprocidade que nem sempre virá e se frustrar profundamente quando não é reconhecido. O amor pode virar cobrança ou sacrifício. O 6 precisa lembrar que servir ao grupo não significa abandonar a própria individualidade."
    ],
    "7": [
      "A sua Expressão 7 busca profundidade, especialização e elevação espiritual. Existe uma consciência que não se satisfaz com respostas superficiais e que pode se manifestar como pesquisador, filósofo, cientista, místico, educador ou alguém chamado a revelar aspectos escondidos da vida. Intuição, silêncio e conhecimento são instrumentos centrais dessa expressão.",
      "Na sombra, essa diferença pode virar isolamento, incompreensão, fanatismo, excesso de crítica ou fuga do mundo. Você pode se sentir estranho entre pessoas que não compartilham sua visão. O 7 se realiza quando transforma solidão em sabedoria e conhecimento em algo que possa beneficiar outras consciências."
    ],
    "8": [
      "A sua Expressão 8 coloca no mundo força executiva, ambição, capacidade de julgamento e domínio sobre estruturas materiais. Poder, dinheiro e responsabilidade aparecem como temas importantes porque você possui potencial para organizar, decidir e conduzir grandes realizações. Existe coragem para enfrentar situações que exigem constância e autoridade.",
      "Na sombra, essa força pode endurecer, alimentar materialismo, ganância, violência ou a ideia de que os fins justificam os meios. O 8 precisa unir matéria e espírito. Quando existe domínio sobre si, justiça e ética, poder deixa de ser controle e se transforma em capacidade real de construir prosperidade."
    ],
    "9": [
      "A sua Expressão 9 carrega uma vibração profundamente ligada à evolução espiritual, compaixão, amor incondicional e consciência universal. Existe aqui uma alma que busca significado para aquilo que faz e que pode se expressar através da arte, do pensamento, do ensino, do serviço e da compreensão profunda da experiência humana. O 9 é chamado de irmão mais velho da humanidade porque sua força tende a ultrapassar o interesse individual.",
      "Na sombra, essa grandeza pode virar idealização, excesso emocional, perfeccionismo, apego a causas, dificuldade de administrar a matéria ou sensação de superioridade. O 9 se realiza quando serve sem se destruir, ama sem se aprisionar e transforma consciência em algo que alcance outras pessoas."
    ],
    "11": [
      "A sua Expressão 11 revela intuição profunda, inspiração e potencial de liderança espiritual. Você pode perceber aspectos da vida que outras pessoas ainda não conseguem nomear e transformar isso em palavra, arte, ensino, serviço ou direção. Existe uma vibração criativa e sensitiva que pede um padrão de consciência mais elevado e uma vida alinhada com aquilo em que você realmente acredita.",
      "Na sombra, tanta sensibilidade pode trazer indecisão, inibição, conflitos, sofrimento diante da incompreensão e sensação de não pertencer ao meio. O 11 precisa confiar na própria intuição sem cair na vaidade espiritual. Quando encontra equilíbrio, sua presença pode inspirar e elevar muitas pessoas."
    ],
    "22": [
      "A sua Expressão 22 possui força de construção em escala ampla. Visão, comando, organização e capacidade de transformar ideias grandes em realidade fazem parte dessa vibração. Você pode assumir responsabilidades que afetam grupos, instituições e comunidades, deixando obras, sistemas ou projetos capazes de continuar existindo além da sua presença.",
      "Na sombra, o alcance do 22 também amplia desonestidade, duplicidade, cegueira ética e uso inadequado do poder. A responsabilidade é grande porque suas escolhas podem tocar muitas vidas. O 22 se realiza quando une idealismo e prática, matéria e consciência, construindo algo que beneficie a humanidade."
    ]
  },
  "Destino": {
    "1": [
      "O seu Destino 1 te coloca numa estrada de individualidade, independência e liderança. A vida tende a exigir que você confie nos próprios recursos, tome decisões e abra caminhos em vez de esperar que alguém faça isso por você. Cada conquista pode se tornar o início de uma nova subida, porque esse Destino não combina com estagnação.",
      "Na sombra, a força de comando pode virar arrogância, egoísmo, precipitação ou dificuldade de trabalhar em grupo. Você pode acreditar que tudo depende apenas de você. O caminho do 1 é aprender a ser comandante sem virar ditador, reconhecer colaboradores e sustentar a própria verdade sem destruir a verdade alheia."
    ],
    "2": [
      "O seu Destino 2 é uma estrada de cooperação, sensibilidade, ritmo e paciência. Muitas oportunidades chegam através das relações, das parcerias e da capacidade de perceber o momento certo. Você pode exercer uma força silenciosa, aquela que atua nos bastidores, une pessoas e transforma conflito em entendimento.",
      "Na sombra, essa espera pode virar acomodação, dependência e medo de iniciar. Você pode perder oportunidades esperando que alguém faça o primeiro movimento. O 2 pede parceria, mas também presença. A vida te ensina que servir, cooperar e acolher não significa entregar ao outro a responsabilidade pelo seu caminho."
    ],
    "3": [
      "O seu Destino 3 é uma estrada de expressão, criatividade, beleza e comunicação. A palavra pode ser uma das grandes chaves da sua vida. Falar, escrever, criar, ensinar, representar ou transformar sentimento em alguma forma de expressão abre caminhos e aproxima pessoas. Existe potencial para transformar adversidades através da imaginação e do contato humano.",
      "Na sombra, o 3 pode se perder em dispersão, impaciência, vaidade, excesso de atividades e dificuldade de levar projetos até o fim. Sua prosperidade cresce quando criatividade ganha direção e quando sua voz deixa de ser apenas movimento para se tornar obra."
    ],
    "4": [
      "O seu Destino 4 é uma estrada de construção, disciplina e permanência. A vida tende a exigir trabalho, repetição, paciência e capacidade de sustentar aquilo que começou. Nem sempre é um caminho leve, mas aquilo que você conquista pode se tornar sólido e duradouro. Existe uma alma chamada a transformar esforço em estrutura.",
      "Na sombra, o 4 pode endurecer, rejeitar o novo, cobrar demais, controlar e até buscar atalhos antiéticos quando se sente pressionado pela matéria. Orgulho, conspiração ou desejo de enriquecer às custas dos outros aparecem como desvios possíveis. Seu caminho pede responsabilidade moral, justiça e poder usado com consciência."
    ],
    "5": [
      "O seu Destino 5 é uma estrada de mudanças, reviravoltas, liberdade e experiências que muitas vezes chegam sem aviso. A vida pode te colocar diante de oportunidades que exigem coragem para romper padrões e experimentar o desconhecido. Movimento, comunicação, sensualidade e capacidade de regeneração fazem parte desse caminho.",
      "Na sombra, a liberdade pode virar instabilidade, excesso, risco, fuga e incapacidade de sustentar escolhas. Você pode confundir transformação com abandono. O 5 pede que cada experiência aumente sua consciência. A aventura precisa produzir evolução, e não apenas mais uma história interrompida."
    ],
    "6": [
      "O seu Destino 6 é uma estrada de amor, responsabilidade, família e serviço. A vida tende a te ensinar o valor da cooperação e da renúncia consciente, mostrando que algumas realizações só existem quando o Eu aprende a caminhar com o Nós. Você pode ser chamado a cuidar, orientar, harmonizar e sustentar pessoas ou comunidades.",
      "Na sombra, essa responsabilidade pode virar sacrifício excessivo, intromissão e tendência a carregar fardos que pertencem aos outros. O 6 precisa amar sem se apagar. Sua missão dentro desse caminho é servir com alegria, proteger sem aprisionar e construir harmonia sem perder a própria identidade."
    ],
    "7": [
      "O seu Destino 7 conduz para dentro. É uma estrada de sabedoria, investigação, especialização e busca pelo significado mais elevado da vida. Intuição, estudo, silêncio e percepção profunda podem se tornar grandes ferramentas. Você pode ser levado a ocupar lugares em que seu conhecimento e sua visão particular te transformem em referência.",
      "Na sombra, essa busca pode virar solidão, dificuldade de expressar sentimentos, isolamento ou afastamento excessivo da vida material. O 7 não pede fuga do mundo. Pede profundidade suficiente para atravessá-lo com consciência e, depois, transformar aquilo que descobriu em sabedoria que tenha utilidade."
    ],
    "8": [
      "O seu Destino 8 é uma estrada de poder, matéria, dinheiro, julgamento e equilíbrio. A vida tende a te colocar diante de decisões grandes, estruturas de autoridade e situações em que será necessário administrar recursos e consequências. Existe potencial para prosperidade e comando, mas também uma cobrança intensa sobre como esse poder será utilizado.",
      "Na sombra, a busca por dinheiro pode fazer você esquecer família, afeto, vida social e espiritualidade. O 8 pode endurecer quando acredita que vencer é tudo. Seu caminho pede domínio sobre si, justiça e equilíbrio entre riqueza e consciência para que prosperidade não se transforme em prisão."
    ],
    "9": [
      "O seu Destino 9 é a estrada da universalidade. A vida tende a ampliar seu olhar através de pessoas, culturas, experiências e causas que ultrapassam a história individual. Em níveis mais elevados de consciência, essa vibração pode se manifestar como liderança espiritual, religiosa ou social, arte, ensino, aconselhamento e serviço à humanidade.",
      "Na sombra, tanta amplitude pode virar fanatismo, distanciamento, sofrimento pelo mundo ou uma vida inteira dedicada aos outros enquanto você se esquece de si. O 9 pede que você ame o todo sem desaparecer dentro dele, sirva sem se sacrificar e transforme sensibilidade em algo que alcance muitas vidas."
    ],
    "11": [
      "O seu Destino 11 é uma estrada de inspiração, espiritualidade e intuição intensa. Você pode perceber não apenas aquilo que está acontecendo, mas também possíveis desdobramentos, e a vida pode te chamar a transmitir uma mensagem, orientar pessoas ou defender ideais que considera elevados. Existe uma consciência universal e uma forte vocação para servir.",
      "Na sombra, essa sensibilidade pode trazer nervosismo, sofrimento, vícios, sacrifício excessivo e dificuldade de equilibrar o plano material com o espiritual. O 11 pede humildade diante da própria percepção. Sua intuição se torna força quando encontra chão, paciência e responsabilidade."
    ],
    "22": [
      "O seu Destino 22 é a estrada do mestre construtor. Existe uma alma madura, chamada a transformar grandes visões em realizações concretas e a deixar uma marca que possa ultrapassar fronteiras pessoais. Política, negócios, arte, liderança, ensino ou grandes projetos podem se tornar campos para uma contribuição de alcance coletivo.",
      "Na sombra, a mesma força pode gerar arrogância, corrupção, traição, desprezo pelo semelhante e uso destrutivo de poder. O 22 amplia tudo. Seu caminho pede sabedoria, justiça, cooperação e consciência espiritual para que aquilo que você constrói realmente sirva à humanidade."
    ]
  },
  "Missão": {
    "1": [
      "A sua Missão 1 pede que você desenvolva liderança sem ser dominado pelo próprio ego. Existe uma vocação para estar à frente, criar, inovar e confiar nos próprios propósitos. A vida pode te chamar repetidamente a tomar decisões, abrir caminhos e assumir responsabilidades que outras pessoas evitam.",
      "Na sombra, liderança pode virar autoritarismo, agressividade e inflexibilidade. O aprendizado é abrir o coração sem perder força. Quando prudência e consciência acompanham sua independência, você deixa de precisar provar poder e passa a exercê-lo com presença."
    ],
    "2": [
      "A sua Missão 2 pede cooperação, equilíbrio, diplomacia e serviço. Você veio aprender a criar harmonia entre pessoas, intenções e situações diferentes, muitas vezes atuando de forma discreta, mas essencial. Existe uma natureza que pode ajudar, acolher, mediar e reorganizar aquilo que perdeu o equilíbrio.",
      "Na sombra, sua boa vontade pode ser explorada por pessoas de má fé ou virar excesso de passividade. O 2 pede coração aberto com discernimento. Servir não é permitir invasão, e perdoar não significa permanecer onde a sua sensibilidade é usada contra você."
    ],
    "3": [
      "A sua Missão 3 pede expressão verdadeira. Palavra, escrita, arte, comunicação, música, criatividade e presença pública podem ser caminhos importantes para aquilo que você veio realizar. Existe uma energia que precisa circular e que encontra força quando você permite que sua voz seja vista e ouvida.",
      "Na sombra, tristeza, desânimo, rotina sufocante ou influência excessiva da opinião alheia podem apagar seu brilho. O 3 pede alegria como força de movimento, não como máscara. Sua missão cresce quando criatividade e intuição encontram coragem para ocupar o mundo."
    ],
    "4": [
      "A sua Missão 4 pede construção, disciplina, perseverança e realidade. Você veio aprender a sustentar processos, trabalhar com constância e transformar intenção em algo concreto. Honestidade, paciência e coragem fazem parte dessa missão, assim como a capacidade de criar estruturas que sirvam também ao coletivo.",
      "Na sombra, trabalho pode virar dureza, rigidez e vida reduzida a obrigação. O 4 precisa lembrar que amor, tolerância e harmonia também fazem parte da construção. A obra não é apenas aquilo que você levanta fora, mas a pessoa que você se torna enquanto constrói."
    ],
    "5": [
      "A sua Missão 5 pede liberdade, ousadia, movimento e experiência. Você veio explorar, investigar, comunicar e abrir espaço para formas novas de viver. Existe magnetismo, curiosidade e capacidade de se adaptar a ambientes e pessoas muito diferentes.",
      "Na sombra, liberdade pode virar fuga e novidade pode impedir conclusão. O 5 precisa aprender que ser livre não significa abandonar tudo quando surge desconforto. Sua missão se fortalece quando aventura, responsabilidade e intuição caminham juntas."
    ],
    "6": [
      "A sua Missão 6 pede amor, cuidado, família e harmonização. Você pode ter uma capacidade natural de perceber sofrimento, acolher pessoas e reorganizar ambientes onde existe conflito. Integridade, bondade e disposição para ajudar fazem parte dessa vibração.",
      "Na sombra, você pode absorver problemas demais, se tornar responsável pelo que não é seu ou ser usado por pessoas que percebem sua disponibilidade. O 6 pede amor com limite. Cuidar do outro não exige abandonar a si mesmo, e servir à família ou ao grupo não significa virar sacrifício permanente."
    ],
    "7": [
      "A sua Missão 7 pede sabedoria, estudo, silêncio e busca espiritual. Pesquisa, introspecção, meditação, intuição e desenvolvimento de habilidades psíquicas aparecem como caminhos importantes. Você veio buscar a essência das coisas e pode se tornar educador, referência ou alguém procurado justamente pela profundidade daquilo que compreende.",
      "Na sombra, essa busca pode virar isolamento, autoritarismo intelectual ou afastamento da matéria. O 7 precisa transformar solidão em templo e conhecimento em serviço. A espiritualidade cresce quando aprofunda sua presença no mundo, não quando serve para fugir dele."
    ],
    "8": [
      "A sua Missão 8 pede progresso material, organização, justiça e evolução espiritual através da relação com o poder. Você pode ser chamado a administrar, liderar, negociar e construir prosperidade em grande escala. Persistência e força de vontade são ferramentas importantes dessa missão.",
      "Na sombra, dinheiro e autoridade podem alimentar teimosia, dureza ou distribuição injusta daquilo que você conquista. O 8 pede justiça diante dos homens e diante da própria consciência. Prosperidade se torna parte da missão quando poder, generosidade e responsabilidade caminham juntos."
    ],
    "9": [
      "A sua Missão 9 pede que você transforme experiência em sabedoria. Muito do que precisa compreender não vem apenas dos livros, mas daquilo que a própria vida faz você atravessar. Existe um chamado para buscar a verdade, desenvolver compaixão e se tornar alguém capaz de orientar, aconselhar e ampliar a consciência de outras pessoas.",
      "Na sombra, você pode sofrer demais pelo mundo e esquecer da própria vida tentando acolher todos. O 9 não pede martírio. Pede que você veja a dor sem ser destruído por ela e transforme aquilo que aprendeu em luz, serviço e direção para outras pessoas."
    ],
    "11": [
      "A sua Missão 11 pede fé, não necessariamente religiosa, mas uma confiança profunda na vida, nos seus ideais, na intuição e no propósito espiritual da sua existência. Você pode ser chamado a harmonizar opostos, usar a palavra, orientar grupos e transformar sensibilidade em inspiração.",
      "Na sombra, mágoas, rancores e conflitos internos podem desviar essa força. O 11 pede diplomacia e alinhamento entre propósito pessoal e evolução espiritual. Sua palavra ganha potência quando nasce de uma consciência que não precisa vencer o outro para sustentar a própria verdade."
    ],
    "22": [
      "A sua Missão 22 pede construção em benefício da humanidade. Existe uma responsabilidade ampla, ligada à capacidade de imaginar grande e transformar visão em projeto concreto. Amor, tolerância, dedicação, sabedoria e renúncia consciente são fundamentos para que essa vibração não se perca no próprio poder.",
      "Na sombra, qualquer descuido pode ganhar proporções maiores porque o 22 trabalha em larga escala. Testes podem aparecer justamente para chamar você à responsabilidade. Sua missão é unir idealismo e prática, matéria e espírito, construindo algo que melhore a vida humana sem perder os pés no chão."
    ]
  }
};

const sequenceReadings = {
  "1": "A pessoa fica limitada, perdendo a coragem de se aventurar em algo novo. Pode, também, ficar um longo período inativo (a), desempregado (a) ou mesmo impotente para realizar o que quer que seja permanecendo nesse estado o tempo que durar o Arcano que domina o período. Esta sequência indica, eventualmente, tendência para desenvolver alguns distúrbios ou doenças cardíacas.",
  "2": "Esta sequência indica possibilidade de timidez e indecisão, podendo levar o (a) seu (a) possuidor (a) a ser subjugado (a) por aqueles mais próximos, sejam eles amigos, sócios, colegas de trabalho ou simplesmente conhecidos. Faz perder a autoestima, limitando-o (a) quanto a seus projetos e realizações. Pode, eventualmente, surgir alguma doença que provoque dependência.",
  "3": "Indica possibilidade de ser incompreendido (a), dificuldade no diálogo, principalmente com colegas de trabalho e com a (o) companheira (o). Tem dificuldade de se impor em seus projetos e para convencer as pessoas. Esta sequência pode, eventualmente, indicar possibilidade de doenças respiratórias ou de articulações.",
  "4": "Reflete dificuldade na realização profissional. Pode ser mal remunerado (a) e as perspectivas profissionais serem difíceis, ou ter dificuldade em se manter no emprego, ou se dar bem em qualquer atividade. Pode, eventualmente, indicar possibilidade de doenças reumáticas ou arteriais.",
  "5": "Indica possíveis mudanças não desejadas de casa, de profissão ou meio social. Sob esta influência, a pessoa tem frequentes altos e baixos, não se fixando profissionalmente, sempre à procura de melhores oportunidades, e ter dificuldade para as encontrar. Pode, também, causar fuga do meio social em que habita e a desenvolver alguma doença de pele.",
  "6": "Indica possibilidade de haver decepções com amigos, sócios, parentes e até com o cônjuge (namorada (o) ou companheira (o)), que não o (a) compreende em seus propósitos e sentimentos. Algum tipo de doença cardíaca pode aparecer nesse estado.",
  "7": "Faz com que se afaste de tudo e de todos. Pode levar ao desmando, transforma-lo (a) em um ser dependente, vaidoso (a), arrogante e, consequentemente, vítima da própria intolerância. A persistência nesse sentimento provoca sentimentos de solidão, doenças nervosas, dependências e, eventualmente, algum tipo de câncer.",
  "8": "Esta sequência torna arredio (a), afastando-o (a) das atividades sociais. Caso não seja evoluído (a) espiritualmente, poderá descontrolar-se emocionalmente com muita facilidade. Sob esta vibração, poderá oscilar entre a riqueza e a pobreza e, como consequência desse estresse, poderá desenvolver alguma doença.",
  "9": "Reflete uma tendência a passar por dificuldades financeiras, eventualmente perdas de bens, eventuais fracassos nos negócios e vários tipos de provações provocadas pelos períodos de estagnação. Tudo isto pode afetar o sistema nervoso e o coração."
};
const services={
  mapa:{number:"01",title:"Mapa da Alma Xamânica",tone:"green",action:"Quero meu mapa completo",investment:"R$ 497",duration:"Produção autoral em até 10 dias úteis",includes:"Mapa digital completo, análise de até 3 correções vibracionais e encontro online de entrega de até 75 minutos.",opening:"Este não é um relatório sobre características. Eu abro a matemática do seu nome para encontrar força, ferida, memória e direção. O mapa mostra onde você se abandona, o que a linhagem ainda repete e qual identidade quer nascer agora.",forYou:"Este trabalho chama quando os mesmos ciclos mudam de rosto, mas terminam no mesmo lugar; quando o nome parece não caber mais; quando você quer compreender missão, ancestralidade, prosperidade, relações ou uma nova assinatura sem respostas genéricas.",process:"Eu cruzo Numerologia Cabalística, Pirâmide da Vida, sequências reais, respostas do questionário, ciclos e Arcanos. A Radiestesia pode entrar nos bastidores para conferir prioridades e compatibilidades.",movement:"Você recebe linguagem para reconhecer a própria história, uma direção prática e um plano para que o que foi compreendido não volte a ficar preso no papel.",journey:[["Antes","Você envia seus nomes, data, questão central e responde ao questionário de escuta. Eu confiro a grafia antes de calcular."],["Durante","Eu calculo, audito a Pirâmide inteira, encontro repetições, cruzo o mapa com a sua história e testo correções sem escolher nome apenas pela soma final."],["Na entrega","A gente se encontra online. Eu leio com você, explico os pontos centrais e abro espaço para as perguntas."],["Depois","Você permanece com o documento, as assinaturas testadas e um plano de integração."]],deliverables:["Mapa autoral diagramado e personalizado","Pirâmide completa e sequências verificadas","Potência, sombra e Arcano dos números centrais","Lições, Dívidas, ausências, excessos e ciclos","Análise ancestral e direção evolutiva","Até 3 correções de nome recalculadas por inteiro","Paleta numerológica e práticas de integração","Indicação terapêutica ligada ao que apareceu"],aftercare:"Se o mapa mostrar um ponto que pede acompanhamento, eu explico por quê e qual cuidado pode servir. Você decide se quer seguir. A leitura não cria obrigação de contratar outro processo."},
  mesa:{number:"03",title:"Mesa Radiônica",tone:"clay",action:"Quero reorganizar este ciclo",investment:"R$ 247",duration:"Abertura, tratamento e acompanhamento por 7 dias",includes:"Conversa inicial, investigação radiestésica do tema, operação da Mesa, devolutiva e orientação de integração.",opening:"Tem coisa que a mente já entendeu e mesmo assim o corpo, o vínculo ou a vida continuam repetindo. A Mesa trabalha essa distância entre consciência e campo.",forYou:"Este processo chama quando existem repetições afetivas, bloqueios de trabalho e prosperidade, vínculos difíceis de encerrar, projetos parados, culpa, medo ou sensação de estar preso ao mesmo ciclo.",process:"Primeiro eu escuto a sua questão. A Radiestesia entra como instrumento da Mesa para investigar prioridade, intensidade e compatibilidade. Depois eu limpo, harmonizo e reorganizo frequências relacionadas ao foco.",movement:"O objetivo é retirar ruído, devolver disponibilidade ao campo e criar uma condição mais limpa para que a mudança encontre atitude concreta.",journey:[["A escuta","Você me conta a repetição e o que já tentou. Eu separo desejo, sintoma e foco real."],["A investigação","Eu uso a Radiestesia dentro da Mesa para localizar prioridades e evitar tratamento genérico."],["A operação","O trabalho é realizado a distância sobre um foco acordado e sem interferir no livre-arbítrio de terceiros."],["A integração","Eu entrego a devolutiva e acompanho o período combinado para observar respostas."]],deliverables:["Escuta e definição de um foco central","Investigação radiestésica dentro do processo","Tratamento vibracional personalizado","Devolutiva do que foi encontrado e trabalhado","Orientação para os 7 dias de integração","Canal de acompanhamento no período combinado"],aftercare:"O campo pode responder de formas diferentes. Eu não crio expectativa obrigatória. Se surgir demanda fora do cuidado energético, oriento a busca de profissional habilitado."},
  reiki:{number:"04",title:"Reiki",tone:"violet",action:"Quero harmonizar minha energia",investment:"R$ 147",duration:"Sessão online de até 60 minutos",includes:"Escuta inicial, aplicação energética, aterramento e conversa breve de integração.",opening:"Nem todo momento pede mais análise. Às vezes você já atravessou demais e o campo precisa ser acolhido antes de receber outra resposta.",forYou:"O Reiki chama em fases de cansaço, sensibilidade elevada, luto, transição, ansiedade, depois de processos intensos ou quando você sente que perdeu o próprio centro.",process:"Eu começo te escutando e combinando um foco. A aplicação acontece a distância, num tempo protegido. Ao final, integro percepções sem transformar sensações em diagnóstico.",movement:"A intenção é devolver presença. Não apagar a história nem forçar leveza, mas criar espaço para corpo, emoção e pensamento pararem de disputar atenção.",journey:[["Chegada","A gente nomeia como você está e o que precisa ser sustentado."],["Aplicação","Você recebe o Reiki num espaço de repouso, com orientação para permanecer confortável."],["Aterramento","A gente volta ao corpo, à respiração e ao aqui."],["Integração","Você recebe cuidados leves para as horas seguintes."]],deliverables:["Escuta breve e foco de harmonização","Aplicação individual a distância","Aterramento ao final","Partilha cuidadosa das percepções","Orientação simples para o restante do dia"],aftercare:"Reiki é cuidado complementar. Não substitui tratamento médico ou psicológico e não exige qualquer fenômeno específico para que a sessão tenha valor."},
  xamanismo:{number:"05",title:"Vivências Xamânicas",tone:"night",action:"Quero viver uma travessia",investment:"R$ 297",duration:"Vivência individual de até 90 minutos",includes:"Escuta do tema, ritual autoral de abertura ou encerramento e orientação de integração.",opening:"Existem mudanças que pedem um marco. Um antes e um depois que o corpo reconheça. A vivência cria esse território simbólico e espiritual de passagem.",forYou:"Este trabalho chama quando você precisa encerrar um ciclo, devolver um peso ancestral, retomar força, atravessar um luto, inaugurar uma identidade, ativar um nome ou firmar uma escolha.",process:"Eu desenho a prática a partir da sua questão. Pode envolver abertura, limpeza, devolução, respiração, presença corporal, palavra, elementos naturais e fogo simbólico.",movement:"Você não sai apenas sabendo o que precisa mudar. Sai tendo começado a mudança com o corpo, a palavra e uma atitude concreta.",journey:[["Preparação","Eu conheço a história, reconheço o limite e explico a vivência antes de começar."],["Abertura","Criamos um campo de presença para separar o cotidiano da travessia."],["Travessia","O ritual dá corpo à escolha por meio da palavra, do gesto e dos elementos."],["Retorno","A gente fecha, aterrissa e transforma o símbolo numa atitude possível."]],deliverables:["Conversa de preparação","Ritual individual criado para a questão","Condução de abertura, movimento e fechamento","Orientação de integração","Prática concreta para sustentar a passagem"],aftercare:"Eu não uso terror espiritual, não prometo cura e não invento narrativa sobre a sua vida. A vivência respeita sua autonomia, seu corpo e seus acompanhamentos profissionais."}
};

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]); }
function reduce(value) { let result = Math.abs(Number(value)); while (result > 9) result = String(result).split("").reduce((sum, digit) => sum + Number(digit), 0); return result; }
function reduceWithMasters(value) { let result = Math.abs(Number(value)); while (result > 9) { if (result === 11 || result === 22) return result; result = String(result).split("").reduce((sum, digit) => sum + Number(digit), 0); } return result; }
function letterValue(letter) { const upper = letter.toLocaleUpperCase("pt-BR"); if (baseValues[upper]) return baseValues[upper]; if (!accents[upper]) return 0; const [baseLetter, mode, amount] = accents[upper]; const base = baseValues[baseLetter]; return mode === "double" ? base * 2 : base + amount; }
function isVowel(letter) { const clean = letter.toLocaleUpperCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); return "AEIOU".includes(clean); }
function buildPyramid(values) { if (!values.length) return []; const rows = [values.map(reduce)]; while (rows.at(-1).length > 1) { const row = rows.at(-1); rows.push(row.slice(0,-1).map((value,index) => reduce(value + row[index+1]))); } return rows; }
function findSequences(rows) { const hits=[]; rows.forEach((row,rowIndex)=>{ let start=0; while(start<row.length){ let end=start+1; while(end<row.length && row[end]===row[start]) end++; if(end-start>=3) hits.push({number:row[start],line:rowIndex+1,length:end-start}); start=end; } }); return hits; }
function calculate(name,date) {
  const letters=[...name].filter((char)=>letterValue(char)>0); const values=letters.map(letterValue);
  const vowels=letters.reduce((sum,char)=>sum+(isVowel(char)?letterValue(char):0),0); const consonants=letters.reduce((sum,char)=>sum+(!isVowel(char)?letterValue(char):0),0);
  const expression=values.reduce((sum,value)=>sum+value,0); const destiny=date.replace(/\D/g,"").split("").reduce((sum,digit)=>sum+Number(digit),0); const pyramid=buildPyramid(values);
  const counts=values.map(reduce).reduce((acc,value)=>{acc[value]=(acc[value]||0)+1;return acc;},{});
  return {letters,pyramid,sequences:findSequences(pyramid),motivation:reduceWithMasters(vowels),impression:reduce(consonants),expression:reduceWithMasters(expression),destiny:reduceWithMasters(destiny),mission:reduceWithMasters(reduceWithMasters(expression)+reduceWithMasters(destiny)),apex:(pyramid.length ? pyramid[pyramid.length-1][0] : 0),missing:Array.from({length:8},(_,i)=>i+1).filter((value)=>!counts[value]),tendencies:Object.entries(counts).filter(([,count])=>count>=4).map(([value,count])=>({value:Number(value),count}))};
}
function formatBirthDate(value) { const digits=value.replace(/\D/g,"").slice(0,8); if(digits.length<=2)return digits; if(digits.length<=4)return `${digits.slice(0,2)}/${digits.slice(2)}`; return `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4)}`; }

function progressHeader(percent, title="Questionário de escuta") { return `<div class="progress-header"><span>${title}</span><span>${percent}%</span></div><div class="progress-track"><i style="width:${percent}%"></i></div>`; }
function optionGroup(legend,name,options){ return `<fieldset class="question-group"><legend>${legend}</legend><div class="option-grid">${options.map((option)=>`<label class="option"><input type="radio" name="${name}" value="${escapeHtml(option)}"><span>${escapeHtml(option)}</span></label>`).join("")}</div></fieldset>`; }
function setError(message){ const old=document.querySelector(".quiz-error"); if(old) old.remove(); if(message){ const error=document.createElement("div"); error.className="quiz-error"; error.textContent=message; const form=document.querySelector(".quiz-form"); if(form) form.prepend(error); } }
function readRadio(name){ const chosen=document.querySelector(`input[name="${name}"]:checked`); return chosen ? chosen.value : ""; }

function renderIdentity(){
  state.step="identity"; const panel=document.querySelector("#quiz-panel");
  panel.innerHTML=`${progressHeader(25)}<form class="quiz-form" id="identity-form"><div class="form-opening"><span class="step-number">01</span><div><h3>Primeiro, eu preciso encontrar a raiz do seu nome.</h3><p>Escreva exatamente como está no registro. Acentos alteram o cálculo.</p></div></div><label class="text-field"><span>Nome completo de nascimento</span><input id="birth-name" required placeholder="Ex.: Ana Martins Silva" value="${escapeHtml(state.birthName)}"></label><label class="text-field"><span>Nome que você usa diariamente</span><input id="daily-name" placeholder="Se for diferente" value="${escapeHtml(state.dailyName)}"></label><label class="text-field"><span>Data de nascimento</span><input id="birth-date" type="text" inputmode="numeric" autocomplete="bday" maxlength="10" required placeholder="Digite apenas os números" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" value="${escapeHtml(state.birthDate)}"></label><p class="field-helper">Digite os 8 números da sua data. Eu coloco as barras para você.</p><button class="primary-button wide">CONTINUAR A ESCUTA</button></form>`;
  const dateField=document.querySelector("#birth-date"); dateField.addEventListener("input",()=>{dateField.value=formatBirthDate(dateField.value);});
  document.querySelector("#identity-form").addEventListener("submit",(event)=>{event.preventDefault();state.birthName=document.querySelector("#birth-name").value.trim();state.dailyName=document.querySelector("#daily-name").value.trim();state.birthDate=document.querySelector("#birth-date").value.trim();if(!state.birthName||!/^\d{2}\/\d{2}\/\d{4}$/.test(state.birthDate)){setError("Escreva o nome completo e digite os oito números da sua data.");return;}renderListening();});
}

function renderListening(){
  state.step="listening"; const panel=document.querySelector("#quiz-panel");
  panel.innerHTML=`${progressHeader(50)}<form class="quiz-form" id="listening-form"><div class="form-opening"><span class="step-number">02</span><div><h3>Agora eu quero aproximar o cálculo da vida que você está vivendo.</h3><p>Não existe resposta certa. Existe aquilo que está vivo.</p></div></div>${optionGroup("1. Qual área da sua vida mais pede cuidado hoje?","area",["Amor e relações","Trabalho e dinheiro","Família e ancestralidade","Voz e autoestima","Espiritualidade","Direção de vida"])}${optionGroup("2. Qual repetição mais cansa você?","repetition",["Carrego tudo sozinho","Começo e não sustento","Me calo para evitar conflito","Trabalho muito e recebo pouco","Repito relações parecidas","Não consigo encerrar ciclos"])}${optionGroup("3. Quando a pressão aumenta, o que você costuma fazer?","pressure",["Tento controlar tudo","Me isolo","Cuido de todos","Fujo ou me distraio","Paraliso","Reajo e depois me arrependo"])}${optionGroup("4. Como está sua energia neste momento?","energy",["Cansada","Acelerada","Dispersa","Pesada","Sensível","Pronta para mudar"])}<div class="form-navigation"><button type="button" class="back-button" id="back-identity">VOLTAR</button><button class="primary-button">CONTINUAR</button></div></form>`;
  document.querySelector("#back-identity").addEventListener("click",renderIdentity);
  document.querySelector("#listening-form").addEventListener("submit",(event)=>{event.preventDefault();["area","repetition","pressure","energy"].forEach((key)=>state.answers[key]=readRadio(key));if(["area","repetition","pressure","energy"].some((key)=>!state.answers[key])){setError("Escolha uma resposta em cada pergunta para continuar.");return;}renderDirection();});
}

function renderDirection(){
  state.step="direction"; const panel=document.querySelector("#quiz-panel");
  panel.innerHTML=`${progressHeader(75)}<form class="quiz-form" id="direction-form"><div class="form-opening"><span class="step-number">03</span><div><h3>Última camada: o que você está pronto para reconhecer?</h3><p>É aqui que o nome encontra a escolha.</p></div></div>${optionGroup("5. Como você se sente ao ouvir o próprio nome?","nameFeeling",["Representado","Distante","Em conflito","Pesado","Curioso","Nunca pensei nisso"])}${optionGroup("6. O que você mais deseja compreender no mapa?","desire",["Minha missão","Meus bloqueios","Minha ancestralidade","Minha prosperidade","Meus relacionamentos","A força do meu nome"])}${optionGroup("7. Se o mapa apontar uma mudança, como você se sente?","readiness",["Pronto para agir","Quero compreender primeiro","Tenho medo de mudar","Preciso de acompanhamento"])}<label class="text-field"><span>8. Se eu estivesse diante de você agora, qual pergunta você me faria?</span><textarea id="central-question" required rows="4" placeholder="Escreva do seu jeito. Não precisa parecer bonito.">${escapeHtml(state.answers.centralQuestion)}</textarea></label><div class="form-navigation"><button type="button" class="back-button" id="back-listening">VOLTAR</button><button class="primary-button">ABRIR MEU MINI MAPA</button></div></form>`;
  document.querySelector("#back-listening").addEventListener("click",renderListening);
  document.querySelector("#direction-form").addEventListener("submit",(event)=>{event.preventDefault();["nameFeeling","desire","readiness"].forEach((key)=>state.answers[key]=readRadio(key));state.answers.centralQuestion=document.querySelector("#central-question").value.trim();if(["nameFeeling","desire","readiness"].some((key)=>!state.answers[key])||!state.answers.centralQuestion){setError("Escolha as três respostas e escreva a pergunta que está viva em você.");return;}renderResult();});
}

function renderResult(){
  state.step="result";
  const result=calculate(state.birthName,state.birthDate);
  const firstName=(state.dailyName||state.birthName).split(/\s+/)[0]||"você";
  const core=[["Motivação",result.motivation],["Impressão",result.impression],["Expressão",result.expression],["Destino",result.destiny],["Missão",result.mission]];
  const numbers=core.map(([label,value])=>`<article><span>${label}</span><strong>${value}</strong></article>`).join("");
  const deepNumbers=core.map(([label,value])=>{
    const paragraphs=(apostilaReadings[label] && apostilaReadings[label][String(value)]) || [];
    return `<article class="number-deep-reading">
      <header class="number-reading-head">
        <div><p class="section-label">${label.toLocaleUpperCase("pt-BR")}</p><h4>${label==="Destino"?`O seu Destino é ${value}.`:`A sua ${label} é ${value}.`}</h4></div>
        <strong>${value}</strong>
      </header>
      <div class="number-voice">
        <h5>LUZ E SOMBRA DO NÚMERO ${value}</h5>
        <div class="apostila-copy">${paragraphs.map((paragraph)=>`<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
      </div>
    </article>`;
  }).join("");

  const pyramid=`<div class="letters-row">${result.letters.map(escapeHtml).join(" ")}</div>${result.pyramid.map((row)=>`<div>${row.join("  ")}</div>`).join("")}`;
  const sequences=result.sequences.length
    ? `<div class="sequence-alert found">
        <p class="section-label">SEQUÊNCIAS ENCONTRADAS</p>
        <h4>SEQUÊNCIAS NEGATIVAS DA PIRÂMIDE</h4>
        <div class="sequence-list">${result.sequences.map((hit)=>{
          const code=String(hit.number).repeat(3);
          return `<article class="sequence-deep-card">
            <header><strong>${code}</strong><span>Linha ${hit.line} • ${hit.length} repetições reais</span></header>
            <h5>Sequência Negativa ${code}</h5>
            <p class="sequence-lived">${escapeHtml(sequenceReadings[hit.number]||"")}</p>
          </article>`;
        }).join("")}</div>
        <p class="truth-note">As referências a condições de saúde reproduzem o material numerológico e não constituem diagnóstico, prognóstico ou orientação médica.</p>
      </div>`
    : `<div class="sequence-alert clear">
        <p class="section-label">SEQUÊNCIAS</p>
        <h4>NENHUMA REPETIÇÃO TRIPLA APARECEU NA SUA PIRÂMIDE.</h4>
        <p>Não foi encontrada sequência consecutiva 111 a 999 nas linhas calculadas da Pirâmide.</p>
      </div>`;

  document.querySelector("#quiz-panel").innerHTML=`${progressHeader(100,"Seu mini mapa")}
    <div class="result-view">
      <div class="result-opening">
        <p class="section-label">SEUS NÚMEROS CENTRAIS</p>
        <h3>${escapeHtml(firstName.toLocaleUpperCase("pt-BR"))}, ESTE É O RESULTADO DO SEU CÁLCULO.</h3>
        <p>Estes são os números centrais encontrados no seu nome e na sua data de nascimento. Leia com presença: cada vibração carrega potência, sombra e um caminho próprio de consciência.</p>
      </div>
      <div class="number-results">${numbers}</div>
      <div class="deep-number-stack">${deepNumbers}</div>
      <div class="pyramid-result">
        <div class="pyramid-copy">
          <p class="section-label">PIRÂMIDE DA VIDA</p>
          <h4>ÁPICE ${result.apex}</h4>
          <p>Uma sequência é registrada quando o mesmo número aparece três ou mais vezes seguidas na mesma linha.</p>
        </div>
        <div class="pyramid-visual">${pyramid}</div>
      </div>
      ${sequences}
      <div class="result-cta">
        <p class="section-label">MAPA NUMEROLÓGICO COMPLETO</p>
        <h4>QUERO CONHECER O RESTANTE DO MEU MAPA.</h4>
        <p>No mapa completo, os demais campos da Numerologia Cabalística são calculados e aprofundados a partir da mesma base.</p>
        <button class="primary-button contact-button" id="result-contact">FALAR DIRETAMENTE COM RARI</button>
        <p class="cta-helper">Ao tocar, o resumo do seu mini mapa entra na conversa que será aberta comigo no WhatsApp.</p>
      </div>
    </div>`;

  document.querySelector("#result-contact").addEventListener("click",()=>{
    const sequenceText=result.sequences.length?result.sequences.map((hit)=>`${String(hit.number).repeat(3)} na linha ${hit.line}`).join(", "):"nenhuma sequência tripla encontrada";
    const message=`Olá, Rari! Fiz o mini mapa no seu site e quero conhecer meu mapa numerológico completo.\n\nNome: ${state.birthName}\nMotivação: ${result.motivation}\nImpressão: ${result.impression}\nExpressão: ${result.expression}\nDestino: ${result.destiny}\nMissão: ${result.mission}\nÁpice: ${result.apex}\nPirâmide: ${sequenceText}`;
    window.open(whatsappUrl(message),"_blank","noopener,noreferrer");
  });
  document.querySelector("#mini-mapa").scrollIntoView({behavior:"smooth"});
}

function openQuiz(){document.querySelector("#quiz-invitation").classList.add("hidden");document.querySelector("#quiz-panel").classList.remove("hidden");renderIdentity();setTimeout(()=>document.querySelector("#mini-mapa").scrollIntoView({behavior:"smooth"}),40);}
function openService(key){
  const service=services[key]; if(!service)return; const root=document.querySelector("#service-detail-root");
  root.innerHTML=`<article class="service-detail ${service.tone}" id="atendimento-aberto"><button class="service-close" type="button" aria-label="Fechar detalhes">FECHAR ×</button><div class="service-threshold"><span>✦</span><p>Você abriu o campo de <strong>${service.title}</strong>. Leia devagar. Perceba não apenas o que faz sentido, mas o que se movimenta em você enquanto lê.</p></div><p class="section-label">${service.number} | ${service.title}</p><h3>${service.opening}</h3><div class="service-offer"><div><span>INVESTIMENTO</span><strong>${service.investment}</strong></div><div><span>TEMPO E FORMATO</span><p>${service.duration}</p></div><div><span>O QUE ESTÁ INCLUÍDO</span><p>${service.includes}</p></div></div><div class="service-detail-grid"><section><span>QUANDO ESTE CUIDADO CHAMA VOCÊ</span><p>${service.forYou}</p></section><section><span>COMO EU TRABALHO COM VOCÊ</span><p>${service.process}</p></section><section><span>O MOVIMENTO QUE BUSCAMOS</span><p>${service.movement}</p></section></div><div class="service-journey"><p class="section-label">A TRAVESSIA DESTE ATENDIMENTO</p>${service.journey.map(([title,copy],index)=>`<section><b>${String(index+1).padStart(2,"0")}</b><div><h4>${title}</h4><p>${copy}</p></div></section>`).join("")}</div><div class="service-receive"><div><p class="section-label">O QUE VOCÊ RECEBE</p><ul>${service.deliverables.map((item)=>`<li>${item}</li>`).join("")}</ul></div><aside><p class="section-label">DEPOIS DA TRAVESSIA</p><p>${service.aftercare}</p></aside></div><div class="service-final-call"><p>Se alguma parte de você reconheceu este cuidado, você não precisa chegar com tudo resolvido. Chegue com verdade. Eu vou escutar o que está acontecendo antes de sugerir qualquer caminho.</p><a class="primary-button service-whatsapp" href="${whatsappUrl(`Olá, Rari! Li sobre ${service.title} (${service.investment}) no seu site. ${service.action} e quero conversar com você para entender se este cuidado combina com o que estou vivendo.`)}" target="_blank" rel="noreferrer">${service.action} PELO WHATSAPP</a><p class="service-autonomy">A ferramenta não vem antes da pessoa. O sagrado não retira a sua autonomia.</p></div></article>`;
  root.querySelector(".service-close").addEventListener("click",()=>{root.innerHTML="";});
  setTimeout(()=>{ const detail=root.querySelector(".service-detail"); if(detail) detail.scrollIntoView({behavior:"smooth",block:"center"}); },40);
}
document.querySelectorAll("[data-open-quiz]").forEach((button)=>button.addEventListener("click",openQuiz));
document.querySelectorAll("[data-whatsapp]").forEach((link)=>{link.href=whatsappUrl(link.dataset.whatsapp);link.target="_blank";link.rel="noreferrer";});
document.querySelectorAll("[data-service-key]").forEach((button)=>button.addEventListener("click",()=>openService(button.dataset.serviceKey)));
