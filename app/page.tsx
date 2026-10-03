'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Lock,
  FileText,
  Scale,
  Landmark,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Building2,
  Briefcase,
  Award,
  Users,
  Clock,
  ArrowUpRight,
  HelpCircle,
  Check,
  X,
  FileCheck2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  TrendingDown,
  Percent,
  Sparkles,
} from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/5519994656845?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20institucional%20reservada%20sobre%20planejamento%20patrimonial.';

function formatBRL(val: number): string {
  return Math.round(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

interface SimulationTier {
  label: string;
  value: number;
  inventarioTotal: number;
  holdingTotal: number;
  tempoInventario: string;
  tempoHolding: string;
  economiaEstimada: number;
}

const SIMULATION_TIERS: SimulationTier[] = [
  {
    label: 'R$ 5 Milhões',
    value: 5000000,
    inventarioTotal: 850000, // ~17% (ITCMD SP 4%-8%, honorários 8%, custas 1%)
    holdingTotal: 195000, // ~3.9% (planejamento prévio, base IRPF histórica)
    tempoInventario: '2 a 4 anos (risco de bloqueio judicial)',
    tempoHolding: '45 a 60 dias (sem necessidade de inventário)',
    economiaEstimada: 655000,
  },
  {
    label: 'R$ 15 Milhões',
    value: 15000000,
    inventarioTotal: 2750000, // ~18.3%
    holdingTotal: 480000, // ~3.2%
    tempoInventario: '3 a 6 anos (litígio potencial e custas escalonadas)',
    tempoHolding: '60 a 90 dias (transferência imediata de quotas)',
    economiaEstimada: 2270000,
  },
  {
    label: 'R$ 40 Milhões',
    value: 40000000,
    inventarioTotal: 7800000, // ~19.5%
    holdingTotal: 1100000, // ~2.75%
    tempoInventario: '4 a 8 anos (risco severo de paralisação de empresas)',
    tempoHolding: '60 a 90 dias (governança ininterrupta e conselho)',
    economiaEstimada: 6700000,
  },
  {
    label: 'R$ 100 Milhões+',
    value: 100000000,
    inventarioTotal: 21000000, // 21%
    holdingTotal: 2400000, // 2.4%
    tempoInventario: '5 a 10+ anos (dilapidação e erosão de liquidez)',
    tempoHolding: 'Imediato (regras estatutárias e sucessão planejada)',
    economiaEstimada: 18600000,
  },
];

const FAQ_ITEMS = [
  {
    question: 'Qual é o momento ideal para estruturar uma Holding Familiar?',
    answer:
      'O momento oportuno é invariavelmente antes da ocorrência de qualquer evento de sucessão ou litígio familiar. Recomenda-se iniciar o processo quando o patriarca ou a matriarca detém plena lucidez, capacidade civil irrestrita e quando o patrimônio é composto por imóveis de aluguel, propriedades rurais, participações societárias ou investimentos financeiros que necessitam de consolidação e otimização fiscal. A estruturação preventiva impede a incidência das futuras alíquotas progressivas do ITCMD trazidas pela Reforma Tributária.',
  },
  {
    question: 'Como se dá a proteção e blindagem do patrimônio rural e das fazendas?',
    answer:
      'O agronegócio paulista e regional exige uma arquitetura específica. Estruturamos holdings rurais que segregam o patrimônio imobiliário (matrículas de terras) dos riscos operacionais inerentes à atividade agropecuária (safra, defensivos, passivos trabalhistas rurais e dívidas com tradings). Mediante contratos de arrendamento ou comodato interno e condomínios agrários instituídos sob regras societárias, as propriedades rurais permanecem imunes a eventuais execuções cíveis ou fiscais operacionais.',
  },
  {
    question: 'O patriarca perde o controle e a gestão dos bens ao doar as quotas aos filhos?',
    answer:
      'Não. Esta é uma das garantias fundamentais da nossa arquitetura jurídica. A doação das quotas societárias aos herdeiros é formalizada estritamente com Cláusula de Reserva de Usufruto Vitalício, além de outorga de poderes de Administração Perpétua e Exclusiva, voto pleno e retenção integral dos dividendos e aluguéis gerados em favor do patriarca ou matriarca. Os herdeiros adquirem a nua-propriedade sem poderes para alienar, hipotecar ou interferir nas deliberações gerenciais até a consolidação sucessória natural.',
  },
  {
    question: 'A criação de uma holding patrimonial constitui manobra evasiva perante a Receita Federal?',
    answer:
      'Absolutamente não. Nossa banca atua sob o princípio da estrita elisão fiscal legítima, fundamentada no art. 23 da Lei Federal nº 9.249/1995, no art. 156, II da Constituição Federal e na pacífica jurisprudência do STJ e STF. A conferência de bens ao capital social pelo valor constante da Declaração de Ajuste Anual de IRPF é prerrogativa conferida por lei federal expressa. Todo o planejamento é lastreado em conformidade documental irretocável perante as Fazendas Nacional, Estadual e Municipal.',
  },
  {
    question: 'Qual o impacto prático da Reforma Tributária (PEC 45/2019) sobre o ITCMD e heranças?',
    answer:
      'A Emenda Constitucional aprovada tornou compulsória a progressividade das alíquotas de ITCMD em todos os estados da Federação, abrindo margem para a majoração do teto fixado pelo Senado Federal para até 16% (o dobro do limite atual de 8%). Em São Paulo, tramitam projetos para elevar a alíquota hoje fixa em 4% para faixas progressivas substancialmente mais gravosas. A antecipação da governança permite travar a tributação pelas regras vigentes, gerando economias tributárias na ordem de dezenas de milhões de reais.',
  },
  {
    question: 'Como a holding blinda o patrimônio familiar contra casamentos e divórcios de herdeiros?',
    answer:
      'Na doação das quotas, inserimos rigorosas cláusulas restritivas de Incomunicabilidade (as quotas não se comunicam a cônjuges ou companheiros, qualquer que seja o regime de bens pactuado), Impenhorabilidade (as quotas não respondem por débitos pessoais dos filhos) e Inalienabilidade (vedação de venda a terceiros sem prévio consentimento). Ademais, o Acordo de Sócios estipula cláusulas de Right of First Refusal (Preferência) e Call Option (Opção de Compra compulsória) para afastar definitivamente ex-cônjuges da gestão patrimonial.',
  },
];

export default function MasterLandingPage() {
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clientType, setClientType] = useState<string>('Familia Empresaria');

  const currentTier = SIMULATION_TIERS[selectedTier];

  return (
    <main className="min-h-screen bg-[#090a0c] text-[#d6dbe4] font-sans selection:bg-[#c4a482]/20 selection:text-[#f4efe9] relative overflow-hidden">
      {/* MONASTIC BACKGROUND GRIDS & RADIAL VIGNETTES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-[#c4a482]/[0.035] via-[#0c1017]/[0.4] to-transparent blur-3xl opacity-80" />
        <div className="absolute top-[30%] right-[-10%] w-[550px] h-[550px] bg-[#0c1424]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#121620]/30 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* 1. BARRA SUPERIOR INSTITUCIONAL */}
      <header className="relative z-30 border-b border-[#8a94a6]/15 bg-[#090a0c]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-semibold tracking-wider text-[#c4a482] uppercase text-[11px]">
              <Scale className="w-3.5 h-3.5 text-[#c4a482]" />
              BUARQUE & VASCONCELLOS • REGISTRO OAB/SP 12.890
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#8a94a6]/40" />
            <span className="hidden sm:inline-block text-[#8a94a6] tracking-wide">
              Sociedade de Advogados Fundada em 1996
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#8a94a6] hidden lg:inline-flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#c4a482]" />
              Atendimento Exclusivo para Famílias Empresárias e Grupos Corporativos
            </span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#c4a482]/40 bg-[#0c1017] text-[#c4a482] hover:bg-[#c4a482]/10 hover:border-[#c4a482] transition-colors text-[11px] font-medium tracking-wide"
            >
              <Lock className="w-3 h-3" />
              Consulta Reservada
            </a>
          </div>
        </div>
      </header>

      {/* NAVEGAÇÃO CORPORATIVA PRINCIPAL */}
      <nav className="relative z-20 border-b border-[#8a94a6]/10 bg-[#090a0c]/70 backdrop-blur-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-none border border-[#c4a482]/50 bg-[#0c1017] flex items-center justify-center p-2 text-[#c4a482] shadow-inner group-hover:border-[#c4a482] transition-colors">
              <Landmark className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#f4efe9] block leading-none">
                BUARQUE & VASCONCELLOS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#8a94a6] uppercase block mt-1 font-medium">
                Advocacia Empresarial & Gestão Patrimonial
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-[#8a94a6]">
            <a
              href="#atuacao"
              className="hover:text-[#f4efe9] transition-colors"
            >
              Áreas de Atuação
            </a>
            <a
              href="#comparativo"
              className="hover:text-[#f4efe9] transition-colors"
            >
              Inventário vs. Holding
            </a>
            <a
              href="#simulador"
              className="hover:text-[#f4efe9] transition-colors"
            >
              Simulação de Eficiência
            </a>
            <a
              href="#protocolo"
              className="hover:text-[#f4efe9] transition-colors"
            >
              Governança em 4 Fases
            </a>
            <a href="#faq" className="hover:text-[#f4efe9] transition-colors">
              FAQ OAB
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 border border-[#8a94a6]/30 bg-[#0c1017] text-[#f4efe9] hover:border-[#c4a482] hover:text-[#c4a482] text-xs font-medium tracking-wide uppercase transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c4a482]" />
              Agendar Reunião
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c4a482] text-[#090a0c] hover:bg-[#b39272] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Canal Reservado
            </a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION DE AUTORIDADE E GOVERNANÇA */}
      <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#8a94a6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* BADGE SUPERIOR SÓBRIO */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c4a482]/30 bg-[#0c1017]/80 text-[#c4a482] text-[11px] font-medium tracking-[0.2em] uppercase mb-8"
            >
              <Shield className="w-3.5 h-3.5" />
              DIREITO SOCIETÁRIO • TRIBUTÁRIO • PLANEJAMENTO PATRIMONIAL
            </motion.div>

            {/* HEADLINE IMPONENTE DE RIGOR JURÍDICO */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#f4efe9] leading-[1.15] mb-6"
            >
              A perpetuação segura do patrimônio familiar construída sobre sólida governança jurídica.
            </motion.h1>

            {/* SUBHEADLINE FORMAL */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg lg:text-xl text-[#9ca7b5] leading-relaxed max-w-3xl mx-auto mb-10 font-normal"
            >
              Estruturação de holdings familiares, blindagem patrimonial preventiva e planejamento sucessório para dinastias empresariais e produtores rurais da região de Campinas e São Paulo.
            </motion.p>

            {/* CTA PRIMÁRIO E AÇÕES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c4a482] text-[#090a0c] hover:bg-[#dfc2a2] text-xs uppercase tracking-[0.15em] font-semibold transition-all shadow-lg hover:shadow-[#c4a482]/10"
              >
                <span>Solicitar Reunião Institucional Reservada</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#comparativo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#8a94a6]/25 bg-[#0c1017]/60 hover:bg-[#0c1017] hover:border-[#c4a482]/60 text-[#d6dbe4] text-xs uppercase tracking-[0.15em] font-medium transition-all"
              >
                <FileCheck2 className="w-4 h-4 text-[#c4a482]" />
                <span>Examinar Painel Comparativo</span>
              </a>
            </motion.div>
          </div>

          {/* TRÍADE DE GARANTIAS CORPORATIVAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#8a94a6]/15">
            <div className="p-6 bg-[#0c1017]/80 border border-[#8a94a6]/15 relative group hover:border-[#c4a482]/40 transition-colors">
              <div className="w-10 h-10 border border-[#c4a482]/30 bg-[#090a0c] flex items-center justify-center text-[#c4a482] mb-4">
                <Lock className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#f4efe9] mb-2 flex items-center justify-between">
                <span>Sigilo Absoluto</span>
                <span className="text-[10px] text-[#8a94a6] tracking-widest uppercase font-mono">
                  NDA 100%
                </span>
              </h3>
              <p className="text-xs text-[#8a94a6] leading-relaxed">
                Tratamento de dados patrimoniais sob rigorosos acordos de confidencialidade (NDA), assegurando discrição perante o mercado, terceiros e credores potenciais.
              </p>
            </div>

            <div className="p-6 bg-[#0c1017]/80 border border-[#8a94a6]/15 relative group hover:border-[#c4a482]/40 transition-colors">
              <div className="w-10 h-10 border border-[#c4a482]/30 bg-[#090a0c] flex items-center justify-center text-[#c4a482] mb-4">
                <TrendingDown className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#f4efe9] mb-2 flex items-center justify-between">
                <span>Eficiência Tributária</span>
                <span className="text-[10px] text-[#8a94a6] tracking-widest uppercase font-mono">
                  ELISÃO LEGAL
                </span>
              </h3>
              <p className="text-xs text-[#8a94a6] leading-relaxed">
                Redução legal expressiva do impacto cumulativo de ITCMD e IRPF na transferência hereditária de cotas, com imunidade legítima de ITBI na integralização de imóveis.
              </p>
            </div>

            <div className="p-6 bg-[#0c1017]/80 border border-[#8a94a6]/15 relative group hover:border-[#c4a482]/40 transition-colors">
              <div className="w-10 h-10 border border-[#c4a482]/30 bg-[#090a0c] flex items-center justify-center text-[#c4a482] mb-4">
                <Scale className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#f4efe9] mb-2 flex items-center justify-between">
                <span>Prevenção de Litígios</span>
                <span className="text-[10px] text-[#8a94a6] tracking-widest uppercase font-mono">
                  GOVERNANÇA
                </span>
              </h3>
              <p className="text-xs text-[#8a94a6] leading-relaxed">
                Acordos de sócios detalhados, conselhos consultivos de família e cláusulas de arbitragem privada que eliminam disputas judiciais desgastantes entre herdeiros.
              </p>
            </div>
          </div>

          {/* INDICADORES INSTITUCIONAIS SÓBRIOS */}
          <div className="mt-12 py-6 px-8 bg-[#0c1017]/40 border border-[#8a94a6]/10 flex flex-wrap items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="block font-serif text-2xl font-bold text-[#f4efe9]">
                +R$ 1.8 Bilhão
              </span>
              <span className="text-[11px] text-[#8a94a6] uppercase tracking-wider">
                Patrimônio estruturado e sob governança
              </span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[#8a94a6]/15" />
            <div>
              <span className="block font-serif text-2xl font-bold text-[#f4efe9]">
                28 Anos
              </span>
              <span className="text-[11px] text-[#8a94a6] uppercase tracking-wider">
                Tradição em Direito Societário e Sucessório
              </span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[#8a94a6]/15" />
            <div>
              <span className="block font-serif text-2xl font-bold text-[#f4efe9]">
                Zero Litígios
              </span>
              <span className="text-[11px] text-[#8a94a6] uppercase tracking-wider">
                Em estruturas com pacto parassocial homologado
              </span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[#8a94a6]/15" />
            <div>
              <span className="block font-serif text-2xl font-bold text-[#f4efe9]">
                RMC & Capital
              </span>
              <span className="text-[11px] text-[#8a94a6] uppercase tracking-wider">
                Sedes em Campinas e na Av. Faria Lima (SP)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ÁREAS DE ATUAÇÃO ESTRATÉGICA */}
      <section id="atuacao" className="relative z-10 py-24 border-b border-[#8a94a6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#c4a482] font-semibold block mb-2">
                Escopos de Excelência
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe9] font-medium tracking-tight">
                Áreas de Atuação Estratégica
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8a94a6] max-w-lg leading-relaxed">
              Soluções jurídicas talhadas de forma artesanal para salvaguardar dinastias empresariais familiares, fundadores de companhias e grandes proprietários rurais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* BLOCO 1 */}
            <div className="bg-[#0c1017] border border-[#8a94a6]/15 p-8 relative flex flex-col justify-between hover:border-[#c4a482]/50 transition-all duration-300">
              <div>
                <div className="w-12 h-12 border border-[#c4a482]/30 bg-[#090a0c] flex items-center justify-center text-[#c4a482] mb-6">
                  <Building2 className="w-6 h-6 stroke-[1.25]" />
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#c4a482] font-mono mb-2">
                  MÓDULO SOCIETÁRIO I
                </div>
                <h3 className="font-serif text-2xl text-[#f4efe9] font-semibold mb-4 leading-snug">
                  Holdings Patrimoniais e Imobiliárias
                </h3>
                <p className="text-xs text-[#8a94a6] leading-relaxed mb-6">
                  Concentração de ativos imobiliários e bens produtivos em pessoas jurídicas sob medida, reduzindo atritos fiscais na locação e na eventual alienação de bens de raiz.
                </p>
                <div className="space-y-3 pt-6 border-t border-[#8a94a6]/10">
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Redução de alíquota sobre receitas de locação de até 27,5% (PF) para aproximadamente 11,33% no regime de Lucro Presumido.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Imunidade de ITBI na integralização de capital conforme preceitos do Tema 796 do STF e análise de preponderância imobiliária.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Segregação estrita entre pessoa física, imóveis familiares e riscos operacionais de empresas produtivas ativas.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#8a94a6]/10 flex items-center justify-between text-xs">
                <span className="text-[#8a94a6]">Estrutura: S/A Fechada ou Ltda.</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4a482] hover:text-[#dfc2a2] font-semibold inline-flex items-center gap-1 group"
                >
                  Consultar <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* BLOCO 2 */}
            <div className="bg-[#0c1017] border border-[#8a94a6]/15 p-8 relative flex flex-col justify-between hover:border-[#c4a482]/50 transition-all duration-300">
              <div>
                <div className="w-12 h-12 border border-[#c4a482]/30 bg-[#090a0c] flex items-center justify-center text-[#c4a482] mb-6">
                  <Shield className="w-6 h-6 stroke-[1.25]" />
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#c4a482] font-mono mb-2">
                  MÓDULO SUCESSÓRIO II
                </div>
                <h3 className="font-serif text-2xl text-[#f4efe9] font-semibold mb-4 leading-snug">
                  Planejamento Sucessório e Doações Guiadas
                </h3>
                <p className="text-xs text-[#8a94a6] leading-relaxed mb-6">
                  Transição patrimonial metódica realizada em vida com reserva integral de usufruto e fixação de cláusulas restritivas inegociáveis de governança.
                </p>
                <div className="space-y-3 pt-6 border-t border-[#8a94a6]/10">
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Cláusulas de Incomunicabilidade, Impenhorabilidade, Inalienabilidade e Reversão para garantia do patrimônio nuclear.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Administração vitalícia e irrevogável assegurada aos patriarcas, com retenção do poder de veto e direitos políticos.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Acordos de Sócios Parassociais (art. 118 da Lei 6.404/76 e Código Civil) disciplinando sucessão e regras de dividendos.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#8a94a6]/10 flex items-center justify-between text-xs">
                <span className="text-[#8a94a6]">Garantia: Usufruto Vitalício</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4a482] hover:text-[#dfc2a2] font-semibold inline-flex items-center gap-1 group"
                >
                  Consultar <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* BLOCO 3 */}
            <div className="bg-[#0c1017] border border-[#8a94a6]/15 p-8 relative flex flex-col justify-between hover:border-[#c4a482]/50 transition-all duration-300">
              <div>
                <div className="w-12 h-12 border border-[#c4a482]/30 bg-[#090a0c] flex items-center justify-center text-[#c4a482] mb-6">
                  <Briefcase className="w-6 h-6 stroke-[1.25]" />
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#c4a482] font-mono mb-2">
                  MÓDULO CORPORATIVO III
                </div>
                <h3 className="font-serif text-2xl text-[#f4efe9] font-semibold mb-4 leading-snug">
                  Contencioso Tributário Estratégico & M&A
                </h3>
                <p className="text-xs text-[#8a94a6] leading-relaxed mb-6">
                  Defesa técnica de autuações fiscais de alta complexidade perante tribunais administrativos (CARF, TIT/SP) e judiciais, além de auditoria em alienações societárias.
                </p>
                <div className="space-y-3 pt-6 border-t border-[#8a94a6]/10">
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Auditoria jurídica prévia (Due Diligence) para operações de compra, venda e fusões de empresas de médio e grande porte.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Defesa intransigente contra desconsideração da personalidade jurídica (art. 50 do CC e Lei de Liberdade Econômica).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#d6dbe4]">
                    <CheckCircle2 className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                    <span>
                      Recuperação administrativa de créditos tributários acumulados e equalização de passivos federais e estaduais.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#8a94a6]/10 flex items-center justify-between text-xs">
                <span className="text-[#8a94a6]">Risco: Análise Probabilística</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4a482] hover:text-[#dfc2a2] font-semibold inline-flex items-center gap-1 group"
                >
                  Consultar <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* DESTAQUE COMPLEMENTAR: AGRONEGÓCIO & TERRAS PAULISTAS */}
          <div className="mt-8 bg-gradient-to-r from-[#0c1017] via-[#0e141f] to-[#0c1017] border border-[#8a94a6]/15 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#090a0c] border border-[#c4a482]/40 flex items-center justify-center text-[#c4a482] shrink-0">
                <Landmark className="w-6 h-6 stroke-[1.25]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#f4efe9]">
                  Especialização Setorial: Holdings Rurais e Governança do Agro na RMC e Interior
                </h4>
                <p className="text-xs text-[#8a94a6] max-w-2xl mt-1">
                  Assessoria especializada para fazendas produtoras de grãos, cana e café: condomínios agrários estruturados, contratos de arrendamento vs. parceria e proteção absoluta das matrículas registrais contra litígios.
                </p>
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-3 border border-[#c4a482] bg-[#0c1017] text-[#c4a482] hover:bg-[#c4a482] hover:text-[#090a0c] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Consultoria Agro Patrimonial
            </a>
          </div>
        </div>
      </section>

      {/* 4. PAINEL COMPARATIVO: INVENTÁRIO TRADICIONAL VS. HOLDING FAMILIAR */}
      <section id="comparativo" className="relative z-10 py-24 border-b border-[#8a94a6]/10 bg-[#0c1017]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c4a482] font-semibold block mb-2">
              Dilema Patrimonial
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe9] font-medium tracking-tight mb-4">
              Inventário Tradicional vs. Holding Familiar
            </h2>
            <p className="text-xs sm:text-sm text-[#8a94a6] leading-relaxed">
              O inventário, seja judicial ou extrajudicial em cartório, acarreta erosão imediata de liquidez, desvalorização de ativos em vendas forçadas e risco concreto de litígios inconciliáveis entre herdeiros.
            </p>
          </div>

          {/* TABELA COMPARATIVA FORMAL */}
          <div className="border border-[#8a94a6]/15 bg-[#090a0c] overflow-hidden shadow-2xl mb-12">
            <div className="grid grid-cols-12 border-b border-[#8a94a6]/15 bg-[#0c1017] text-xs font-semibold uppercase tracking-wider text-[#8a94a6]">
              <div className="col-span-4 p-4 sm:p-5">Dimensão Jurídica & Operacional</div>
              <div className="col-span-4 p-4 sm:p-5 text-red-400/90 border-l border-[#8a94a6]/15 bg-red-950/10 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Inventário Tradicional (Judicial / Cartório)</span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 text-[#c4a482] border-l border-[#8a94a6]/15 bg-[#c4a482]/5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Holding Familiar Institucional</span>
              </div>
            </div>

            {/* LINHA 1: Custo Total */}
            <div className="grid grid-cols-12 border-b border-[#8a94a6]/10 text-xs hover:bg-[#0c1017]/50 transition-colors">
              <div className="col-span-4 p-4 sm:p-5 font-medium text-[#f4efe9]">
                Custo Financeiro Total
                <span className="block text-[11px] text-[#8a94a6] font-normal mt-0.5">
                  Impostos, honorários advocatícios e emolumentos
                </span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-red-950/[0.04] text-[#d6dbe4]">
                <span className="text-red-400 font-semibold block text-sm">
                  De 15% a 25% do patrimônio líquido
                </span>
                Calculado sobre o valor de mercado atualizado dos bens, exigindo desembolso imediato em dinheiro.
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-[#c4a482]/[0.02] text-[#d6dbe4]">
                <span className="text-[#c4a482] font-semibold block text-sm">
                  De 2% a 4% do patrimônio
                </span>
                Doação de cotas pelo valor contábil declarado na DIRPF (Lei 9.249/95), diluindo e amortizando custos.
              </div>
            </div>

            {/* LINHA 2: Impacto Tributário e Reforma */}
            <div className="grid grid-cols-12 border-b border-[#8a94a6]/10 text-xs hover:bg-[#0c1017]/50 transition-colors">
              <div className="col-span-4 p-4 sm:p-5 font-medium text-[#f4efe9]">
                Impacto do ITCMD
                <span className="block text-[11px] text-[#8a94a6] font-normal mt-0.5">
                  Vigência da Reforma Tributária (PEC 45/2019)
                </span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-red-950/[0.04] text-[#d6dbe4]">
                <span className="text-red-400 font-semibold block">
                  Alíquota progressiva de até 8% (ou 16%)
                </span>
                Cobrança compulsória sobre avaliação venal do Fisco Estadual, gerando cobranças complementares pesadas.
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-[#c4a482]/[0.02] text-[#d6dbe4]">
                <span className="text-[#c4a482] font-semibold block">
                  Congelamento na base de custo
                </span>
                Antecipação legal com alíquotas vigentes mais favoráveis, sem surpresas com reavaliações do Fisco.
              </div>
            </div>

            {/* LINHA 3: Tempo de Tramitação */}
            <div className="grid grid-cols-12 border-b border-[#8a94a6]/10 text-xs hover:bg-[#0c1017]/50 transition-colors">
              <div className="col-span-4 p-4 sm:p-5 font-medium text-[#f4efe9]">
                Tempo de Tramitação & Liquidez
                <span className="block text-[11px] text-[#8a94a6] font-normal mt-0.5">
                  Acesso aos recursos financeiros e contas
                </span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-red-950/[0.04] text-[#d6dbe4]">
                <span className="text-red-400 font-semibold block">
                  3 a 10 anos (ou mais em caso de litígio)
                </span>
                Bloqueio instantâneo de contas bancárias, aplicações e impedimento de venda de imóveis sem alvará judicial.
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-[#c4a482]/[0.02] text-[#d6dbe4]">
                <span className="text-[#c4a482] font-semibold block">
                  Transferência em 30 a 60 dias
                </span>
                Sem necessidade de processo judicial ou escritura de inventário: o usufruto se extingue por certidão na Junta Comercial.
              </div>
            </div>

            {/* LINHA 4: Continuidade dos Negócios */}
            <div className="grid grid-cols-12 border-b border-[#8a94a6]/10 text-xs hover:bg-[#0c1017]/50 transition-colors">
              <div className="col-span-4 p-4 sm:p-5 font-medium text-[#f4efe9]">
                Governança & Continuidade Empresarial
                <span className="block text-[11px] text-[#8a94a6] font-normal mt-0.5">
                  Operação contínua de indústrias, fazendas e comércios
                </span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-red-950/[0.04] text-[#d6dbe4]">
                <span className="text-red-400 font-semibold block">
                  Paralisia gerencial e perda de crédito bancário
                </span>
                Disputa entre herdeiros pela inventariança e travamento de linhas de crédito essenciais à operação.
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-[#c4a482]/[0.02] text-[#d6dbe4]">
                <span className="text-[#c4a482] font-semibold block">
                  Transição transparente e ininterrupta
                </span>
                Administrador sucessor previamente designado em contrato social e acordo de quotistas, sem qualquer hiato de poder.
              </div>
            </div>

            {/* LINHA 5: Vulnerabilidade a Agregados */}
            <div className="grid grid-cols-12 border-b border-[#8a94a6]/10 text-xs hover:bg-[#0c1017]/50 transition-colors">
              <div className="col-span-4 p-4 sm:p-5 font-medium text-[#f4efe9]">
                Intromissão de Cônjuges e Credores
                <span className="block text-[11px] text-[#8a94a6] font-normal mt-0.5">
                  Blindagem contra casamentos, uniões estáveis e dívidas
                </span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-red-950/[0.04] text-[#d6dbe4]">
                <span className="text-red-400 font-semibold block">
                  Vulnerabilidade absoluta (Código Civil)
                </span>
                Genros, noras ou eventuais credores pessoais dos herdeiros passam a integrar o condomínio indiviso forçado dos bens.
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-[#c4a482]/[0.02] text-[#d6dbe4]">
                <span className="text-[#c4a482] font-semibold block">
                  Cláusulas restritivas inegociáveis
                </span>
                Incomunicabilidade, impenhorabilidade e inalienabilidade com direito de preferência exclusivo aos membros consanguíneos.
              </div>
            </div>

            {/* LINHA 6: Discrição e Privacidade */}
            <div className="grid grid-cols-12 text-xs hover:bg-[#0c1017]/50 transition-colors">
              <div className="col-span-4 p-4 sm:p-5 font-medium text-[#f4efe9]">
                Publicidade e Exposição de Ativos
                <span className="block text-[11px] text-[#8a94a6] font-normal mt-0.5">
                  Segurança patrimonial e discrição pública
                </span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-red-950/[0.04] text-[#d6dbe4]">
                <span className="text-red-400 font-semibold block">
                  Processo público e exposto
                </span>
                Relação integral de bens, saldos bancários e partilha acessíveis a terceiros, pesquisadores e imprensa local.
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#8a94a6]/10 bg-[#c4a482]/[0.02] text-[#d6dbe4]">
                <span className="text-[#c4a482] font-semibold block">
                  Confidencialidade estrita
                </span>
                Patrimônio protegido sob regras societárias privadas e acordos de quotistas mantidos sob custódia fechada da sociedade.
              </div>
            </div>
          </div>

          {/* SIMULADOR INTERATIVO DE EFICIÊNCIA SUCESSÓRIA */}
          <div id="simulador" className="bg-[#0c1017] border border-[#c4a482]/30 p-8 sm:p-10 relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-[#8a94a6]/15 pb-6">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#c4a482] font-mono block mb-1">
                  ESTIMADOR DE EFICIÊNCIA PATRIMONIAL
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe9] font-medium">
                  Simulação Comparativa de Preservação de Capital
                </h3>
                <p className="text-xs text-[#8a94a6] mt-1">
                  Selecione a faixa aproximada do acervo patrimonial familiar para confrontar a sangria do inventário comum contra uma estrutura institucional.
                </p>
              </div>

              {/* SELETORES DE FAIXA */}
              <div className="flex flex-wrap items-center gap-2">
                {SIMULATION_TIERS.map((tier, idx) => (
                  <button
                    key={tier.label}
                    onClick={() => setSelectedTier(idx)}
                    className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all border ${
                      selectedTier === idx
                        ? 'bg-[#c4a482] text-[#090a0c] border-[#c4a482]'
                        : 'bg-[#090a0c] text-[#8a94a6] border-[#8a94a6]/20 hover:border-[#c4a482]/50 hover:text-[#d6dbe4]'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RESULTADOS DA SIMULAÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CARD INVENTÁRIO */}
              <div className="p-6 bg-[#090a0c] border border-red-900/30">
                <span className="text-[10px] uppercase tracking-widest text-red-400 font-semibold block mb-1">
                  Custo Médio no Inventário
                </span>
                <div className="font-serif text-3xl font-bold text-red-400/90 mb-2">
                  R$ {formatBRL(currentTier.inventarioTotal)}
                </div>
                <div className="text-xs text-[#8a94a6] space-y-2 pt-4 border-t border-[#8a94a6]/10">
                  <div className="flex justify-between">
                    <span>ITCMD (4% a 8%):</span>
                    <span className="font-mono text-[#d6dbe4]">
                      ~R$ {formatBRL(currentTier.value * 0.06)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Honorários Advocatícios (Tabela OAB 8%):</span>
                    <span className="font-mono text-[#d6dbe4]">
                      ~R$ {formatBRL(currentTier.value * 0.08)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custas Judiciais / Cartório:</span>
                    <span className="font-mono text-[#d6dbe4]">
                      ~R$ {formatBRL(currentTier.value * 0.03)}
                    </span>
                  </div>
                  <div className="pt-2 text-red-300/80 text-[11px] italic">
                    Duração estimada: {currentTier.tempoInventario}
                  </div>
                </div>
              </div>

              {/* CARD HOLDING */}
              <div className="p-6 bg-[#090a0c] border border-[#c4a482]/40">
                <span className="text-[10px] uppercase tracking-widest text-[#c4a482] font-semibold block mb-1">
                  Custo na Holding Pré-Estruturada
                </span>
                <div className="font-serif text-3xl font-bold text-[#c4a482] mb-2">
                  R$ {formatBRL(currentTier.holdingTotal)}
                </div>
                <div className="text-xs text-[#8a94a6] space-y-2 pt-4 border-t border-[#8a94a6]/10">
                  <div className="flex justify-between">
                    <span>ITCMD Otimizado (Base Histórica):</span>
                    <span className="font-mono text-[#d6dbe4]">
                      ~R$ {formatBRL(currentTier.holdingTotal * 0.45)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assessoria Jurídica Estrutural:</span>
                    <span className="font-mono text-[#d6dbe4]">Honorário Fixo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emolumentos Registrais JUCESP/Cartório:</span>
                    <span className="font-mono text-[#d6dbe4]">Taxas Fixas</span>
                  </div>
                  <div className="pt-2 text-[#c4a482] text-[11px] font-medium">
                    Prazo de conclusão: {currentTier.tempoHolding}
                  </div>
                </div>
              </div>

              {/* CARD ECONOMIA LÍQUIDA */}
              <div className="p-6 bg-gradient-to-b from-[#0c1424] to-[#090a0c] border border-[#c4a482]/60 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#c4a482]/10 border border-[#c4a482]/40 text-[#c4a482] text-[10px] uppercase font-mono tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    Capital Preservado para Herdeiros
                  </div>
                  <div className="text-xs text-[#8a94a6]">Economia Líquida Estimada:</div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe9] my-2">
                    R$ {formatBRL(currentTier.economiaEstimada)}
                  </div>
                  <p className="text-xs text-[#8a94a6] leading-relaxed">
                    Valor que permanece integralmente no caixa das empresas e nas contas da família, sem ser drenado por tributos excessivos e custas forenses.
                  </p>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full py-3 bg-[#c4a482] hover:bg-[#dfc2a2] text-[#090a0c] text-xs font-semibold uppercase tracking-wider text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Submeter Meu Patrimônio a Estudo</span>
                </a>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-[#8a94a6]/80 text-center sm:text-left italic">
              * Nota Metodológica: Estimativa estritamente ilustrativa com base na legislação tributária paulista (Lei Estadual 10.705/2000), na jurisprudência consolidada do STF/STJ e na tabela de honorários recomendada pela OAB/SP. Casos concretos exigem Due Diligence minuciosa.
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROTOCOLO INSTITUCIONAL DE GOVERNANÇA EM 4 FASES */}
      <section id="protocolo" className="relative z-10 py-24 border-b border-[#8a94a6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c4a482] font-semibold block mb-2">
              Rigor Metodológico
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe9] font-medium tracking-tight mb-4">
              Protocolo Institucional de Governança em 4 Fases
            </h2>
            <p className="text-xs sm:text-sm text-[#8a94a6] leading-relaxed">
              Cada arquitetura societária é conduzida pessoalmente pelos sócios fundadores, seguindo um ciclo hermético de quatro etapas documentais auditadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ETAPA I */}
            <div className="p-6 bg-[#0c1017] border border-[#8a94a6]/15 relative">
              <div className="font-serif text-3xl font-light text-[#c4a482]/40 mb-3">01</div>
              <h4 className="font-serif text-lg font-semibold text-[#f4efe9] mb-2">
                Diagnóstico & Due Diligence
              </h4>
              <p className="text-xs text-[#8a94a6] leading-relaxed mb-4">
                Levantamento exaustivo de certidões cíveis, fiscais e trabalhistas, avaliação contábil do IRPF e matrícula de todos os imóveis rurais e urbanos.
              </p>
              <div className="text-[11px] font-mono text-[#c4a482] flex items-center gap-1.5">
                <FileText className="w-3 h-3" />
                Dossiê de Riscos Preliminar
              </div>
            </div>

            {/* ETAPA II */}
            <div className="p-6 bg-[#0c1017] border border-[#8a94a6]/15 relative">
              <div className="font-serif text-3xl font-light text-[#c4a482]/40 mb-3">02</div>
              <h4 className="font-serif text-lg font-semibold text-[#f4efe9] mb-2">
                Desenho Arquitetural
              </h4>
              <p className="text-xs text-[#8a94a6] leading-relaxed mb-4">
                Modelagem da sociedade (Ltda. ou S/A Fechada), estudo da preponderância imobiliária para imunidade de ITBI e simulação de cenários de IRPF/ITCMD.
              </p>
              <div className="text-[11px] font-mono text-[#c4a482] flex items-center gap-1.5">
                <Building2 className="w-3 h-3" />
                Memorando Societário Tributário
              </div>
            </div>

            {/* ETAPA III */}
            <div className="p-6 bg-[#0c1017] border border-[#8a94a6]/15 relative">
              <div className="font-serif text-3xl font-light text-[#c4a482]/40 mb-3">03</div>
              <h4 className="font-serif text-lg font-semibold text-[#f4efe9] mb-2">
                Instrumentos & Blindagem
              </h4>
              <p className="text-xs text-[#8a94a6] leading-relaxed mb-4">
                Redação do Contrato Social com Golden Share, doação com Reserva de Usufruto e lavratura do Acordo de Sócios com regras estritas de incomunicabilidade.
              </p>
              <div className="text-[11px] font-mono text-[#c4a482] flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                Pacto de Sócios & Quotas
              </div>
            </div>

            {/* ETAPA IV */}
            <div className="p-6 bg-[#0c1017] border border-[#8a94a6]/15 relative">
              <div className="font-serif text-3xl font-light text-[#c4a482]/40 mb-3">04</div>
              <h4 className="font-serif text-lg font-semibold text-[#f4efe9] mb-2">
                Integralização Registral
              </h4>
              <p className="text-xs text-[#8a94a6] leading-relaxed mb-4">
                Registro na Junta Comercial (JUCESP), averbação nos Cartórios de Registro de Imóveis (CRI) com exoneração de ITBI e instituição de conselho familiar.
              </p>
              <div className="text-[11px] font-mono text-[#c4a482] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                Matrículas Convalidadas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ INSTITUCIONAL (ACORDEÃO DE RIGOR OAB) */}
      <section id="faq" className="relative z-10 py-24 border-b border-[#8a94a6]/10 bg-[#0c1017]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c4a482] font-semibold block mb-2">
              Esclarecimentos Jurídicos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe9] font-medium tracking-tight mb-4">
              Perguntas Frequentes (Rigor OAB)
            </h2>
            <p className="text-xs sm:text-sm text-[#8a94a6] leading-relaxed max-w-2xl mx-auto">
              Respostas institucionais redigidas em estrita conformidade com o Código de Ética e Disciplina da OAB e o Provimento nº 205/2021 do Conselho Federal.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-[#8a94a6]/15 bg-[#090a0c] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#f4efe9] leading-snug">
                      {item.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border border-[#c4a482]/40 flex items-center justify-center shrink-0 text-[#c4a482] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#c4a482]/10' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-[#9ca7b5] leading-relaxed border-t border-[#8a94a6]/10 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 border border-[#c4a482]/30 bg-[#0c1017] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#c4a482] shrink-0" />
              <span className="text-xs text-[#d6dbe4]">
                Possui uma tese patrimonial atípica ou questão societária complexa?
              </span>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 bg-[#c4a482] text-[#090a0c] hover:bg-[#dfc2a2] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <span>Submeter Questão ao Sócio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO FINAL: AGENDAMENTO INSTITUCIONAL RESERVADO */}
      <section className="relative z-10 py-24 bg-[#090a0c]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 border border-[#c4a482]/40 bg-[#0c1017] flex items-center justify-center text-[#c4a482] mx-auto mb-6">
            <Landmark className="w-7 h-7 stroke-[1.25]" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#c4a482] font-semibold block mb-3">
            Atendimento Reservado Sob NDA
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe9] font-medium tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Assegure a inviolabilidade e a longevidade do patrimônio que custou uma vida para erguer.
          </h2>

          <p className="text-xs sm:text-base text-[#8a94a6] max-w-2xl mx-auto mb-10 leading-relaxed">
            Reuniões presenciais restritas em nossas sedes de Campinas (Nova Campinas) ou São Paulo (Itaim Bibi/Faria Lima), ou por videoconferência encriptada de ponta a ponta.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c4a482] text-[#090a0c] hover:bg-[#dfc2a2] text-xs uppercase tracking-[0.15em] font-semibold transition-all shadow-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Iniciar Contato Reservado via WhatsApp</span>
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#8a94a6]/30 bg-[#0c1017] hover:border-[#c4a482] text-[#d6dbe4] text-xs uppercase tracking-[0.15em] font-medium transition-all"
            >
              <Calendar className="w-4 h-4 text-[#c4a482]" />
              <span>Solicitar Formulário de Pré-Qualificação</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. RODAPÉ CORPORATIVO E NOTAS LEGAIS */}
      <footer className="relative z-10 border-t border-[#8a94a6]/20 bg-[#07080a] text-xs text-[#8a94a6] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* COLUNA 1: IDENTIDADE */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-[#c4a482]/50 bg-[#0c1017] flex items-center justify-center text-[#c4a482]">
                  <Scale className="w-4 h-4 stroke-[1.5]" />
                </div>
                <span className="font-serif text-lg font-bold text-[#f4efe9]">
                  BUARQUE & VASCONCELLOS
                </span>
              </div>
              <p className="text-[11px] text-[#8a94a6] leading-relaxed mb-4">
                Sociedade de Advogados devidamente registrada perante a Ordem dos Advogados do Brasil, Seção São Paulo, sob o nº 12.890.
              </p>
              <div className="text-[11px] text-[#c4a482] font-mono">
                CNPJ: 02.481.930/0001-44
              </div>
            </div>

            {/* COLUNA 2: SÓCIOS NOMINAIS */}
            <div>
              <h5 className="font-serif text-sm font-semibold text-[#f4efe9] uppercase tracking-wider mb-4 border-b border-[#8a94a6]/15 pb-2">
                Sócios Titulares
              </h5>
              <div className="space-y-3 text-[11px]">
                <div>
                  <div className="text-[#d6dbe4] font-medium">
                    Dr. Octávio Buarque de Holanda Neto
                  </div>
                  <div className="text-[#8a94a6]">
                    OAB/SP 142.980 • Mestre em Direito Tributário (USP)
                  </div>
                </div>
                <div>
                  <div className="text-[#d6dbe4] font-medium">
                    Dra. Cecília de Albuquerque Vasconcellos
                  </div>
                  <div className="text-[#8a94a6]">
                    OAB/SP 198.412 • Especialista em Sucessões (Mackenzie)
                  </div>
                </div>
                <div>
                  <div className="text-[#d6dbe4] font-medium">
                    Dr. Eduardo Vasconcellos Silveira
                  </div>
                  <div className="text-[#8a94a6]">
                    OAB/SP 264.105 • Pós-Graduado em M&A e Governança (FGV)
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA 3: UNIDADES CORPORATIVAS */}
            <div>
              <h5 className="font-serif text-sm font-semibold text-[#f4efe9] uppercase tracking-wider mb-4 border-b border-[#8a94a6]/15 pb-2">
                Unidades Corporativas
              </h5>
              <div className="space-y-3 text-[11px]">
                <div>
                  <div className="text-[#d6dbe4] font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#c4a482]" />
                    Sede Regional Campinas (RMC)
                  </div>
                  <div className="text-[#8a94a6] pl-4">
                    Edifício Royal Palm Tower, Av. José de Souza Campos, Nova Campinas, Campinas/SP
                  </div>
                </div>
                <div>
                  <div className="text-[#d6dbe4] font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#c4a482]" />
                    Unidade Capital São Paulo
                  </div>
                  <div className="text-[#8a94a6] pl-4">
                    Edifício Faria Lima Financial Center, Av. Brig. Faria Lima, Itaim Bibi, São Paulo/SP
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA 4: CONTATO INSTITUCIONAL */}
            <div>
              <h5 className="font-serif text-sm font-semibold text-[#f4efe9] uppercase tracking-wider mb-4 border-b border-[#8a94a6]/15 pb-2">
                Comunicação Direta
              </h5>
              <div className="space-y-2.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c4a482]" />
                  <span>WhatsApp: +55 (19) 99465-6845</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#c4a482]" />
                  <span>contato@buarquevasconcellos.adv.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#c4a482]" />
                  <span>Atendimento reservado: Seg - Sex | 09h às 18h</span>
                </div>
              </div>
            </div>
          </div>

          {/* NOTA DE CONFORMIDADE ÉTICA OAB */}
          <div className="pt-8 border-t border-[#8a94a6]/15 text-[11px] leading-relaxed text-[#8a94a6]/90 space-y-3">
            <p>
              <strong>NOTA INSTITUCIONAL DE ÉTICA PROFISSIONAL (CFOAB):</strong> Esta página e todos os seus módulos têm caráter estritamente informativo e acadêmico, em integral observância ao Provimento nº 205/2021 do Conselho Federal da Ordem dos Advogados do Brasil (CFOAB) e aos artigos 28 a 34 do Código de Ética e Disciplina da OAB. Não constituem captação mercantil de clientela, nem oferta pública de serviços, tampouco promessa infalível de resultados tributários ou judiciais.
            </p>
          </div>

          {/* ASSINATURA OBRIGATÓRIA PARVUS SPACE */}
          <div className="mt-8 pt-6 border-t border-[#8a94a6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div className="text-[#8a94a6]">
              © 2026 Buarque & Vasconcellos Advogados. Todos os direitos reservados.
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#8a94a6]/20 bg-[#0c1017] text-[#8a94a6]">
              <span>Digital Architecture by</span>
              <a
                href="https://parvuspace.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c4a482] hover:underline font-semibold"
              >
                Parvus Space (parvuspace.com.br)
              </a>
              <span className="text-[#8a94a6]/40">|</span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d6dbe4] hover:text-[#c4a482] transition-colors"
              >
                WhatsApp Comercial: +55 (19) 99465-6845
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DE AGENDAMENTO RESERVADO COM PROTOCOLO NDA */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl bg-[#0c1017] border border-[#c4a482]/40 shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-[#8a94a6] hover:text-[#f4efe9] transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[#c4a482] text-xs font-mono tracking-widest uppercase mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Protocolo de Consulta Reservada</span>
              </div>

              <h3 className="font-serif text-2xl text-[#f4efe9] font-semibold mb-2">
                Solicitação de Reunião com os Sócios
              </h3>
              <p className="text-xs text-[#8a94a6] mb-6 leading-relaxed">
                Preencha os parâmetros preliminares para que nossa secretaria executiva prepare a minuta do Acordo de Confidencialidade (NDA) antes da primeira deliberação.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const targetMsg = `Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20institucional%20reservada%20sobre%20planejamento%20patrimonial.%20Perfil%3A%20${encodeURIComponent(
                    clientType
                  )}.`;
                  window.open(
                    `https://wa.me/5519994656845?text=${targetMsg}`,
                    '_blank'
                  );
                  setModalOpen(false);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-[#d6dbe4] mb-1 font-medium">
                    Perfil da Entidade / Família
                  </label>
                  <select
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#090a0c] border border-[#8a94a6]/25 text-[#d6dbe4] focus:border-[#c4a482] focus:outline-none"
                  >
                    <option value="Família Empresária com Múltiplos Ativos">
                      Família Empresária com Múltiplos Ativos
                    </option>
                    <option value="Produtor Rural / Agronegócio (Fazendas e Terras)">
                      Produtor Rural / Agronegócio (Fazendas e Terras)
                    </option>
                    <option value="Grupo Corporativo / Holdings Operacionais">
                      Grupo Corporativo / Holdings Operacionais
                    </option>
                    <option value="Investidor Imobiliário / Patrimônio de Renda">
                      Investidor Imobiliário / Patrimônio de Renda
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#d6dbe4] mb-1 font-medium">
                    Unidade de Preferência para o Atendimento
                  </label>
                  <select className="w-full px-3.5 py-2.5 bg-[#090a0c] border border-[#8a94a6]/25 text-[#d6dbe4] focus:border-[#c4a482] focus:outline-none">
                    <option>Sede Regional Campinas (Nova Campinas)</option>
                    <option>Unidade Capital São Paulo (Av. Faria Lima / Itaim)</option>
                    <option>Videoconferência Encriptada de Alta Segurança</option>
                  </select>
                </div>

                <div className="p-3 bg-[#090a0c] border border-[#8a94a6]/15 flex items-start gap-2.5 text-[11px] text-[#8a94a6]">
                  <Shield className="w-4 h-4 text-[#c4a482] shrink-0 mt-0.5" />
                  <span>
                    Todas as comunicações e eventuais documentos apresentados são tutelados pelo sigilo profissional inerente à advocacia e por Termo de Confidencialidade Bilateral (NDA).
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 border border-[#8a94a6]/20 text-[#8a94a6] hover:text-[#d6dbe4] transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#c4a482] text-[#090a0c] hover:bg-[#dfc2a2] font-semibold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Conectar ao WhatsApp Reservado</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
