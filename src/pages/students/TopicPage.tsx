import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
  BookOpen, Calculator, Atom, Code, Dna, Brain, BarChart3, 
  ChevronDown, ChevronLeft, ChevronRight, Globe, Shield, GraduationCap,
  CheckCircle, Play, FileText, Lightbulb, Languages, X, Check
} from 'lucide-react';

// Subject metadata
const subjectMeta: Record<string, { name: string; icon: typeof Calculator; color: string }> = {
  math: { name: 'Mathematics', icon: Calculator, color: 'from-blue-500 to-blue-700' },
  physics: { name: 'Physics', icon: Atom, color: 'from-purple-500 to-purple-700' },
  cs: { name: 'Computer Science', icon: Code, color: 'from-green-500 to-green-700' },
  biology: { name: 'Biology', icon: Dna, color: 'from-pink-500 to-pink-700' },
  reasoning: { name: 'Scientific Reasoning', icon: Lightbulb, color: 'from-yellow-500 to-yellow-700' },
  data: { name: 'Data Interpretation', icon: BarChart3, color: 'from-cyan-500 to-cyan-700' },
  critical: { name: 'Critical Thinking', icon: Brain, color: 'from-orange-500 to-orange-700' },
};

// Sample topic content (in a real app, this would come from an API)
const topicContent: Record<string, {
  title: string;
  titleEn: string;
  concept: { native: string; english: string };
  examples: { problem: string; solution: string; explanation: string }[];
  practiceQuestions: { question: string; options: string[]; correctIndex: number; explanation: string }[];
}> = {
  'linear-equations': {
    title: 'Doğrusal Denklemler',
    titleEn: 'Linear Equations',
    concept: {
      native: `Doğrusal denklemler, değişkenlerin birinci dereceden olduğu denklemlerdir. Genel formu ax + b = c şeklindedir, burada a, b ve c sabitlerdir ve x bilinmeyendir.

Doğrusal denklemlerin temel özellikleri:
• Değişkenin üssü her zaman 1'dir
• Grafiği bir doğrudur
• Tek bir çözümü vardır (a ≠ 0 ise)

Çözüm yöntemi:
1. Denklemi sadeleştirin
2. Bilinmeyeni bir tarafa toplayın
3. Sabitleri diğer tarafa toplayın
4. Katsayıya bölün`,
      english: `Linear equations are equations where variables are of the first degree. The general form is ax + b = c, where a, b, and c are constants and x is the unknown.

Key properties of linear equations:
• The exponent of the variable is always 1
• The graph is a straight line
• Has a single solution (if a ≠ 0)

Solution method:
1. Simplify the equation
2. Collect unknowns on one side
3. Collect constants on the other side
4. Divide by the coefficient`
    },
    examples: [
      {
        problem: '2x + 5 = 13',
        solution: 'x = 4',
        explanation: `Adım 1: Her iki taraftan 5 çıkarın
2x + 5 - 5 = 13 - 5
2x = 8

Adım 2: Her iki tarafı 2'ye bölün
2x ÷ 2 = 8 ÷ 2
x = 4

Doğrulama: 2(4) + 5 = 8 + 5 = 13 ✓`
      },
      {
        problem: '3x - 7 = 2x + 4',
        solution: 'x = 11',
        explanation: `Adım 1: x terimlerini bir tarafa toplayın
3x - 2x - 7 = 4
x - 7 = 4

Adım 2: Her iki tarafa 7 ekleyin
x - 7 + 7 = 4 + 7
x = 11

Doğrulama: 3(11) - 7 = 33 - 7 = 26
2(11) + 4 = 22 + 4 = 26 ✓`
      }
    ],
    practiceQuestions: [
      {
        question: '4x - 3 = 17 denkleminin çözümü nedir?',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctIndex: 2,
        explanation: '4x - 3 = 17 → 4x = 20 → x = 5'
      },
      {
        question: '2(x + 3) = 14 denkleminin çözümü nedir?',
        options: ['x = 2', 'x = 4', 'x = 5', 'x = 7'],
        correctIndex: 1,
        explanation: '2(x + 3) = 14 → x + 3 = 7 → x = 4'
      },
      {
        question: '5x + 2 = 3x + 10 denkleminin çözümü nedir?',
        options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
        correctIndex: 2,
        explanation: '5x + 2 = 3x + 10 → 2x = 8 → x = 4'
      }
    ]
  },
  'quadratic-equations': {
    title: 'İkinci Derece Denklemler',
    titleEn: 'Quadratic Equations',
    concept: {
      native: `İkinci derece denklemler, değişkenin en yüksek kuvvetinin 2 olduğu denklemlerdir. Genel formu ax² + bx + c = 0 şeklindedir.

Çözüm yöntemleri:
• Çarpanlara ayırma
• Kareyi tamamlama
• Diskriminant formülü: x = (-b ± √(b²-4ac)) / 2a

Diskriminant (Δ = b² - 4ac):
• Δ > 0: İki farklı gerçek kök
• Δ = 0: Tek kök (çakışık kökler)
• Δ < 0: Gerçek kök yok`,
      english: `Quadratic equations are equations where the highest power of the variable is 2. The general form is ax² + bx + c = 0.

Solution methods:
• Factoring
• Completing the square
• Quadratic formula: x = (-b ± √(b²-4ac)) / 2a

Discriminant (Δ = b² - 4ac):
• Δ > 0: Two distinct real roots
• Δ = 0: One root (repeated roots)
• Δ < 0: No real roots`
    },
    examples: [
      {
        problem: 'x² - 5x + 6 = 0',
        solution: 'x = 2 veya x = 3',
        explanation: `Çarpanlara ayırma yöntemi:
x² - 5x + 6 = 0
(x - 2)(x - 3) = 0

x - 2 = 0 → x = 2
x - 3 = 0 → x = 3

Doğrulama: 
2² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓
3² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓`
      }
    ],
    practiceQuestions: [
      {
        question: 'x² - 4 = 0 denkleminin kökleri nelerdir?',
        options: ['x = ±1', 'x = ±2', 'x = ±3', 'x = ±4'],
        correctIndex: 1,
        explanation: 'x² = 4 → x = ±2'
      }
    ]
  },
  'derivatives': {
    title: 'Türev',
    titleEn: 'Derivatives',
    concept: {
      native: `Türev, bir fonksiyonun değişim hızını ölçer. f(x) fonksiyonunun türevi f'(x) olarak gösterilir.

Temel türev kuralları:
• Sabit kuralı: d/dx[c] = 0
• Kuvvet kuralı: d/dx[xⁿ] = nxⁿ⁻¹
• Toplam kuralı: d/dx[f + g] = f' + g'
• Çarpım kuralı: d/dx[fg] = f'g + fg'
• Zincir kuralı: d/dx[f(g(x))] = f'(g(x)) · g'(x)

Türevin yorumu:
• f'(x) > 0: Fonksiyon artan
• f'(x) < 0: Fonksiyon azalan
• f'(x) = 0: Kritik nokta (maksimum, minimum veya bükülme noktası olabilir)`,
      english: `The derivative measures the rate of change of a function. The derivative of f(x) is denoted as f'(x).

Basic derivative rules:
• Constant rule: d/dx[c] = 0
• Power rule: d/dx[xⁿ] = nxⁿ⁻¹
• Sum rule: d/dx[f + g] = f' + g'
• Product rule: d/dx[fg] = f'g + fg'
• Chain rule: d/dx[f(g(x))] = f'(g(x)) · g'(x)

Interpretation of derivative:
• f'(x) > 0: Function is increasing
• f'(x) < 0: Function is decreasing
• f'(x) = 0: Critical point (could be maximum, minimum, or inflection point)`
    },
    examples: [
      {
        problem: `A function f(x) is continuous on an interval.
Which of the following statements is always true?
A) If f'(x) = 0 at a point, the function has a maximum there
B) If f'(x) > 0, the function is increasing at that point
C) If f'(x) does not exist, the function is discontinuous
D) If f'(x) is constant, the function must be quadratic`,
        solution: 'B) If f\'(x) > 0, the function is increasing at that point',
        explanation: `Positive derivative means the function is increasing locally.
A is false: f'(x) = 0 could be an inflection point.
C is false: |x| has no derivative at x=0 but is continuous.
D is false: constant derivative means linear function.`
      }
    ],
    practiceQuestions: [
      {
        question: 'The graph of f(x) is shown (imagine a smooth curve). At which point does the function change from concave up to concave down?',
        options: ['Where f\'(x) = 0', 'Where f\'\'(x) = 0 and changes sign', 'Where the function crosses the x-axis', 'Where the slope is maximum'],
        correctIndex: 1,
        explanation: 'This is the definition of an inflection point. The second derivative determines concavity, and a sign change indicates the transition.'
      },
      {
        question: 'Let f(x) = (3x² - 5)⁴. Find f\'(x).',
        options: ['f\'(x) = 4(3x² - 5)³', 'f\'(x) = 24x(3x² - 5)³', 'f\'(x) = 6x(3x² - 5)³', 'f\'(x) = 12x(3x² - 5)⁴'],
        correctIndex: 1,
        explanation: 'Using the chain rule: f\'(x) = 4(3x² - 5)³ · 6x = 24x(3x² - 5)³. Chain rule is fundamental in AI, physics, optimization, and neural networks.'
      },
      {
        question: 'The position of a particle is given by s(t) = t³ - 6t² + 9t. What is the velocity at t = 2?',
        options: ['1', '-3', '3', '9'],
        correctIndex: 1,
        explanation: 'Velocity is the derivative of position: v(t) = s\'(t) = 3t² - 12t + 9. v(2) = 3(4) - 12(2) + 9 = 12 - 24 + 9 = -3'
      },
      {
        question: 'A rectangle has a perimeter of 40 units. What dimensions maximize its area?',
        options: ['5 × 15', '8 × 12', '10 × 10', '12 × 8'],
        correctIndex: 2,
        explanation: 'For a fixed perimeter, maximum area occurs when the rectangle is a square. Perimeter = 40, so each side = 40/4 = 10. Area = 10 × 10 = 100 (maximum)'
      }
    ]
  },
  'integrals': {
    title: 'İntegral',
    titleEn: 'Integrals',
    concept: {
      native: `İntegral, türevin tersi işlemidir ve alan hesaplamada kullanılır.

Belirli integral: ∫ₐᵇ f(x) dx = F(b) - F(a)
Belirsiz integral: ∫ f(x) dx = F(x) + C

Temel integral kuralları:
• ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)
• ∫ eˣ dx = eˣ + C
• ∫ 1/x dx = ln|x| + C

İntegralin yorumu:
• Belirli integral, eğri altındaki alanı verir
• Negatif değerler, x-ekseninin altındaki alanı temsil eder`,
      english: `Integration is the reverse operation of differentiation and is used for area calculation.

Definite integral: ∫ₐᵇ f(x) dx = F(b) - F(a)
Indefinite integral: ∫ f(x) dx = F(x) + C

Basic integration rules:
• ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)
• ∫ eˣ dx = eˣ + C
• ∫ 1/x dx = ln|x| + C

Interpretation of integral:
• Definite integral gives the area under the curve
• Negative values represent area below the x-axis`
    },
    examples: [
      {
        problem: `Which statement best describes the definite integral ∫ₐᵇ f(x) dx?
A) The slope of f(x) at a point
B) The accumulated area under f(x) from a to b
C) The maximum value of f(x)
D) The average rate of change`,
        solution: 'B) The accumulated area under f(x) from a to b',
        explanation: `The definite integral represents the net signed area between the curve and the x-axis from x = a to x = b. This is a fundamental concept connecting calculus to real-world applications like physics and economics.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Evaluate ∫₀² (3x²) dx',
        options: ['6', '8', '12', '24'],
        correctIndex: 1,
        explanation: '∫₀² 3x² dx = [x³]₀² = 2³ - 0³ = 8'
      },
      {
        question: 'A function f(x) is positive on [0, 2] and negative on [2, 4]. What does ∫₀⁴ f(x) dx represent?',
        options: ['Total area under the curve', 'Net signed area (positive minus negative)', 'Only the positive area', 'Only the negative area'],
        correctIndex: 1,
        explanation: 'The definite integral gives the net signed area. Positive regions contribute positively, negative regions contribute negatively.'
      },
      {
        question: 'If velocity v(t) = 4t, what is the displacement from t = 0 to t = 3?',
        options: ['12', '18', '24', '36'],
        correctIndex: 1,
        explanation: 'Displacement = ∫₀³ 4t dt = [2t²]₀³ = 2(9) - 0 = 18'
      },
      {
        question: 'To find the area between two curves y = f(x) and y = g(x), where f(x) > g(x), we compute:',
        options: ['∫[f(x) - g(x)] dx', '∫[g(x) - f(x)] dx', '∫f(x) dx - ∫g(x) dx separately', '∫[f(x) + g(x)] dx'],
        correctIndex: 0,
        explanation: 'Upper curve − lower curve → correct order matters. Area = ∫[f(x) - g(x)] dx'
      }
    ]
  },
  'differential-equations': {
    title: 'Diferansiyel Denklemler',
    titleEn: 'Differential Equations',
    concept: {
      native: `Diferansiyel denklemler, türevler içeren denklemlerdir. Birçok doğal olayı modellemek için kullanılır.

Temel türler:
• Birinci derece: dy/dx = f(x, y)
• İkinci derece: d²y/dx² = f(x, y, dy/dx)

Çözüm yöntemleri:
• Değişkenleri ayırma
• İntegrasyon faktörü
• Karakteristik denklem

Uygulamalar:
• Popülasyon büyümesi
• Radyoaktif bozunma
• Isı transferi`,
      english: `Differential equations are equations containing derivatives. They are used to model many natural phenomena.

Basic types:
• First order: dy/dx = f(x, y)
• Second order: d²y/dx² = f(x, y, dy/dx)

Solution methods:
• Separation of variables
• Integrating factor
• Characteristic equation

Applications:
• Population growth
• Radioactive decay
• Heat transfer`
    },
    examples: [
      {
        problem: `Which of the following is a differential equation?
A) x² + 3x = 5
B) dy/dx = 2x
C) y = 3x + 1
D) ∫x dx = x²/2`,
        solution: 'B) dy/dx = 2x',
        explanation: `A differential equation contains derivatives. Only option B contains dy/dx, which is a derivative. The others are algebraic equations, linear equations, or integrals.`
      }
    ],
    practiceQuestions: [
      {
        question: 'A population grows at a rate proportional to its size. Which equation models this?',
        options: ['dP/dt = k', 'dP/dt = kP', 'dP/dt = k/P', 'dP/dt = kP²'],
        correctIndex: 1,
        explanation: 'Exponential growth is modeled by dP/dt = kP, where the rate of change is proportional to the current population.'
      },
      {
        question: 'Solve: dy/dx = x, with y(0) = 1',
        options: ['y = x²/2', 'y = x²/2 + 1', 'y = x + 1', 'y = 2x'],
        correctIndex: 1,
        explanation: 'Integrating dy/dx = x gives y = x²/2 + C. Using y(0) = 1: 1 = 0 + C, so C = 1. Therefore y = x²/2 + 1'
      },
      {
        question: 'The half-life of a substance is 10 years. If you start with 100g, how much remains after 20 years?',
        options: ['50g', '25g', '10g', '0g'],
        correctIndex: 1,
        explanation: 'After one half-life (10 years): 100g → 50g. After two half-lives (20 years): 50g → 25g'
      },
      {
        question: 'Which method is used to solve dy/dx = xy?',
        options: ['Direct integration', 'Separation of variables', 'Substitution only', 'Cannot be solved'],
        correctIndex: 1,
        explanation: 'Separation of variables: dy/y = x dx → ln|y| = x²/2 + C → y = Ce^(x²/2)'
      }
    ]
  },
  'vectors': {
    title: 'Vektörler',
    titleEn: 'Vectors',
    concept: {
      native: `Vektörler, hem büyüklük hem de yön içeren matematiksel nesnelerdir.

Temel işlemler:
• Toplama: (a₁, a₂) + (b₁, b₂) = (a₁+b₁, a₂+b₂)
• Skaler çarpım: k(a₁, a₂) = (ka₁, ka₂)
• Nokta çarpım: a⃗ · b⃗ = |a||b|cos(θ)
• Çapraz çarpım: a⃗ × b⃗ (3D'de)

Uygulamalar:
• Fizik (kuvvet, hız)
• Bilgisayar grafikleri
• Mühendislik`,
      english: `Vectors are mathematical objects that have both magnitude and direction.

Basic operations:
• Addition: (a₁, a₂) + (b₁, b₂) = (a₁+b₁, a₂+b₂)
• Scalar multiplication: k(a₁, a₂) = (ka₁, ka₂)
• Dot product: a⃗ · b⃗ = |a||b|cos(θ)
• Cross product: a⃗ × b⃗ (in 3D)

Applications:
• Physics (force, velocity)
• Computer graphics
• Engineering`
    },
    examples: [
      {
        problem: `A vector has:
A) Only magnitude
B) Only direction
C) Both magnitude and direction
D) Neither`,
        solution: 'C) Both magnitude and direction',
        explanation: `A vector is defined by both its magnitude (length) and direction. This distinguishes it from a scalar, which has only magnitude.`
      }
    ],
    practiceQuestions: [
      {
        question: 'If a⃗ = (3, 4), what is |a⃗|?',
        options: ['5', '7', '12', '25'],
        correctIndex: 0,
        explanation: '|a⃗| = √(3² + 4²) = √(9 + 16) = √25 = 5'
      },
      {
        question: 'Two vectors are perpendicular when their dot product is:',
        options: ['1', '-1', '0', 'undefined'],
        correctIndex: 2,
        explanation: 'a⃗ · b⃗ = |a||b|cos(θ). When θ = 90°, cos(90°) = 0, so the dot product is 0.'
      },
      {
        question: 'If a⃗ = (2, 3) and b⃗ = (4, -1), find a⃗ + b⃗',
        options: ['(6, 2)', '(6, 4)', '(-2, 4)', '(8, -3)'],
        correctIndex: 0,
        explanation: 'a⃗ + b⃗ = (2+4, 3+(-1)) = (6, 2)'
      },
      {
        question: 'Work done by a force F⃗ over displacement d⃗ is calculated as:',
        options: ['F⃗ × d⃗', 'F⃗ · d⃗', '|F⃗| + |d⃗|', 'F⃗ / d⃗'],
        correctIndex: 1,
        explanation: 'Work = F⃗ · d⃗ (dot product). This directly connects vectors to physics and engineering.'
      }
    ]
  },
  'matrices': {
    title: 'Matrisler',
    titleEn: 'Matrices',
    concept: {
      native: `Matrisler, sayıların dikdörtgen düzende sıralandığı matematiksel yapılardır.

Temel işlemler:
• Toplama: Aynı boyutlu matrislerin karşılıklı elemanları toplanır
• Çarpma: (m×n) × (n×p) = (m×p)
• Determinant: 2×2 için ad - bc
• Ters matris: A⁻¹ (det(A) ≠ 0 ise)

Uygulamalar:
• Lineer denklem sistemleri
• Bilgisayar grafikleri
• Yapay zeka`,
      english: `Matrices are mathematical structures where numbers are arranged in a rectangular array.

Basic operations:
• Addition: Add corresponding elements of same-sized matrices
• Multiplication: (m×n) × (n×p) = (m×p)
• Determinant: For 2×2, ad - bc
• Inverse matrix: A⁻¹ (if det(A) ≠ 0)

Applications:
• Systems of linear equations
• Computer graphics
• Artificial intelligence`
    },
    examples: [
      {
        problem: `Given A = [1 2; 3 4] and B = [5 6; 7 8], find A + B.
A) [6 8; 10 12]
B) [4 4; 4 4]
C) [5 12; 21 32]
D) Cannot be added`,
        solution: 'A) [6 8; 10 12]',
        explanation: `Matrix addition: add corresponding elements.
[1+5  2+6]   [6  8]
[3+7  4+8] = [10 12]`
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the determinant of [3 1; 2 4]?',
        options: ['10', '14', '5', '11'],
        correctIndex: 0,
        explanation: 'det = (3)(4) - (1)(2) = 12 - 2 = 10'
      },
      {
        question: 'For matrix multiplication AB to be defined, which must be true?',
        options: ['A and B must be square', 'Columns of A = Rows of B', 'Rows of A = Columns of B', 'A and B must be identical'],
        correctIndex: 1,
        explanation: 'For AB to be defined, the number of columns in A must equal the number of rows in B.'
      },
      {
        question: 'The identity matrix I satisfies:',
        options: ['AI = 0', 'AI = A', 'AI = I', 'AI = A⁻¹'],
        correctIndex: 1,
        explanation: 'The identity matrix I is the multiplicative identity: AI = IA = A for any compatible matrix A.'
      },
      {
        question: 'Matrices are used in computer graphics for:',
        options: ['Only storing images', 'Transformations like rotation and scaling', 'Only color calculations', 'Sound processing only'],
        correctIndex: 1,
        explanation: 'Rotations, scaling, reflections → matrices. This bridges to graphics, robotics, and AI.'
      }
    ]
  },
  'modern-physics': {
    title: 'Modern Fizik',
    titleEn: 'Modern Physics',
    concept: {
      native: `Modern fizik, 20. yüzyılda gelişen ve klasik fiziğin ötesine geçen fizik dalıdır.

Temel konular:
• Fotoelektrik etki: E = hf
• Foton enerjisi ve frekans ilişkisi
• de Broglie dalga boyu: λ = h/p
• Dalga-parçacık ikiliği
• Atomik enerji seviyeleri
• Kütle-enerji eşdeğerliği: E = mc²

Uygulamalar:
• Güneş panelleri
• Lazerler
• Nükleer enerji`,
      english: `Modern physics is the branch of physics developed in the 20th century that goes beyond classical physics.

Key topics:
• Photoelectric effect: E = hf
• Photon energy and frequency relationship
• de Broglie wavelength: λ = h/p
• Wave-particle duality
• Atomic energy levels
• Mass-energy equivalence: E = mc²

Applications:
• Solar panels
• Lasers
• Nuclear energy`
    },
    examples: [
      {
        problem: `According to the photoelectric effect, electrons are emitted from a metal surface when:
A) The intensity of light is increased
B) The frequency of light exceeds a minimum threshold
C) The temperature of the metal increases
D) The wavelength of light is increased`,
        solution: 'B) The frequency of light exceeds a minimum threshold',
        explanation: `Energy depends on frequency, not intensity. This disproved classical wave-only models.
Key relation: E = hf`
      }
    ],
    practiceQuestions: [
      {
        question: 'The energy of a photon is directly proportional to:',
        options: ['Its wavelength', 'Its speed', 'Its frequency', 'Its mass'],
        correctIndex: 2,
        explanation: 'E = hf. Higher frequency → higher photon energy.'
      },
      {
        question: 'In a photoelectric experiment, if the intensity of light is increased while the frequency remains below the threshold, what happens?',
        options: ['More electrons are emitted', 'Electrons are emitted with greater kinetic energy', 'No electrons are emitted', 'The metal heats up and emits electrons'],
        correctIndex: 2,
        explanation: 'Below threshold frequency → no photoelectric effect, regardless of intensity.'
      },
      {
        question: 'According to de Broglie (λ = h/p), which particle would have the shortest wavelength?',
        options: ['A slow-moving electron', 'A fast-moving electron', 'A slow-moving proton', 'A fast-moving proton'],
        correctIndex: 3,
        explanation: 'Larger momentum → shorter wavelength. Proton has much larger mass, fast proton → maximum momentum.'
      },
      {
        question: 'Which phenomenon best demonstrates the wave nature of electrons?',
        options: ['Photoelectric effect', 'Electron diffraction', 'Nuclear fusion', 'Radioactive decay'],
        correctIndex: 1,
        explanation: 'Diffraction and interference are wave behaviors, even for particles.'
      },
      {
        question: 'Why do atoms emit discrete (line) spectra instead of continuous spectra?',
        options: ['Electrons move randomly', 'Atoms vibrate at fixed frequencies', 'Electrons occupy quantized energy levels', 'Photons lose energy over time'],
        correctIndex: 2,
        explanation: 'Electron transitions occur only between allowed energy states.'
      },
      {
        question: 'Which force is primarily responsible for holding the nucleus together?',
        options: ['Gravitational force', 'Electromagnetic force', 'Strong nuclear force', 'Weak nuclear force'],
        correctIndex: 2,
        explanation: 'The strong nuclear force overcomes proton–proton repulsion at short distances.'
      },
      {
        question: 'Einstein\'s equation E = mc² implies that:',
        options: ['Mass can be destroyed', 'Energy has mass', 'Mass and energy are interchangeable', 'Energy always travels at speed c'],
        correctIndex: 2,
        explanation: 'Small amounts of mass can convert into enormous energy → nuclear reactions.'
      },
      {
        question: 'Which process powers the Sun?',
        options: ['Nuclear fission', 'Chemical combustion', 'Nuclear fusion', 'Radioactive decay'],
        correctIndex: 2,
        explanation: 'Hydrogen nuclei fuse to form helium, releasing energy.'
      },
      {
        question: 'Which statement best summarizes modern physics?',
        options: ['Energy is continuous', 'Matter behaves only as particles', 'Classical physics explains all phenomena', 'Nature behaves discretely at microscopic scales'],
        correctIndex: 3,
        explanation: 'Modern physics introduced quantization, probability, and duality.'
      }
    ]
  },
  'quantum-intro': {
    title: 'Kuantuma Giriş',
    titleEn: 'Introduction to Quantum Physics',
    concept: {
      native: `Kuantum fiziği, atom altı parçacıkların davranışını açıklayan fizik dalıdır.

Temel kavramlar:
• Kuantizasyon: Enerji kesikli paketler halinde
• Planck sabiti: h = 6.626 × 10⁻³⁴ J·s
• Dalga-parçacık ikiliği
• Heisenberg belirsizlik ilkesi
• Dalga fonksiyonu ve olasılık

Klasik vs Kuantum:
• Klasik: Kesin konum ve hız
• Kuantum: Olasılıksal tahminler`,
      english: `Quantum physics is the branch of physics that explains the behavior of subatomic particles.

Key concepts:
• Quantization: Energy in discrete packets
• Planck's constant: h = 6.626 × 10⁻³⁴ J·s
• Wave-particle duality
• Heisenberg uncertainty principle
• Wave function and probability

Classical vs Quantum:
• Classical: Exact position and velocity
• Quantum: Probabilistic predictions`
    },
    examples: [
      {
        problem: `Which statement best describes the quantum world?
A) Objects have exact positions and velocities at all times
B) Energy is always continuous
C) Outcomes can only be predicted probabilistically
D) Measurement does not affect the system`,
        solution: 'C) Outcomes can only be predicted probabilistically',
        explanation: `Quantum physics replaces certainty with probability.`
      }
    ],
    practiceQuestions: [
      {
        question: 'What does it mean that energy is "quantized"?',
        options: ['Energy can be infinitely divided', 'Energy exists only in discrete packets', 'Energy depends only on mass', 'Energy is always conserved'],
        correctIndex: 1,
        explanation: 'Atoms absorb and emit energy in fixed amounts (quanta).'
      },
      {
        question: 'Why is Planck\'s constant h important in quantum physics?',
        options: ['It determines the speed of light', 'It connects energy with frequency', 'It explains gravity', 'It measures mass'],
        correctIndex: 1,
        explanation: 'E = hf. This equation started the quantum revolution.'
      },
      {
        question: 'Which statement best explains wave–particle duality?',
        options: ['Particles sometimes disappear', 'Waves sometimes gain mass', 'Matter and light can behave as both waves and particles', 'Only photons show wave behavior'],
        correctIndex: 2,
        explanation: 'Electrons can diffract like waves and collide like particles.'
      },
      {
        question: 'Electron diffraction is strong evidence that:',
        options: ['Electrons are charged', 'Electrons have mass', 'Electrons behave like waves', 'Electrons travel at speed of light'],
        correctIndex: 2,
        explanation: 'Diffraction is a wave phenomenon.'
      },
      {
        question: 'The uncertainty principle states that:',
        options: ['We can measure position and momentum exactly', 'Measurement errors cause uncertainty', 'Nature fundamentally limits what can be known', 'Instruments are not precise enough'],
        correctIndex: 2,
        explanation: 'Uncertainty is not due to poor instruments—it is fundamental.'
      },
      {
        question: 'What happens when a quantum system is measured?',
        options: ['Nothing changes', 'The wavefunction collapses', 'Energy is destroyed', 'The particle disappears'],
        correctIndex: 1,
        explanation: 'Before measurement → probability. After measurement → definite outcome.'
      },
      {
        question: 'In quantum mechanics, the square of the wavefunction represents:',
        options: ['Energy', 'Velocity', 'Probability density', 'Force'],
        correctIndex: 2,
        explanation: '|ψ|² = probability'
      },
      {
        question: 'How do quantum predictions differ from classical predictions?',
        options: ['Quantum is always wrong', 'Quantum physics ignores forces', 'Quantum predictions are statistical', 'Quantum only applies to large objects'],
        correctIndex: 2,
        explanation: 'Quantum mechanics predicts likelihoods, not certainties.'
      },
      {
        question: 'Why is quantum physics important for technology?',
        options: ['It only applies to space', 'It enables semiconductors, lasers, quantum computing', 'It has no practical use', 'It only explains gravity'],
        correctIndex: 1,
        explanation: 'No quantum physics → no computers, no internet, no MRI.'
      }
    ]
  },
  'relativity': {
    title: 'Görelilik',
    titleEn: 'Introduction to Relativity',
    concept: {
      native: `Görelilik teorisi, Einstein tarafından geliştirilen ve uzay, zaman ve kütlenin ilişkisini açıklayan teoridir.

Özel görelilik:
• Işık hızı sabittir (c ≈ 3×10⁸ m/s)
• Zaman genişlemesi
• Uzunluk kısalması
• Eşzamanlılığın göreliliği

Genel görelilik:
• Kütle uzay-zamanı büker
• Kütleçekim bir kuvvet değil, geometridir

Uygulamalar:
• GPS sistemleri
• Kara delik fiziği`,
      english: `Relativity theory, developed by Einstein, explains the relationship between space, time, and mass.

Special relativity:
• Speed of light is constant (c ≈ 3×10⁸ m/s)
• Time dilation
• Length contraction
• Relativity of simultaneity

General relativity:
• Mass curves spacetime
• Gravity is not a force, it's geometry

Applications:
• GPS systems
• Black hole physics`
    },
    examples: [
      {
        problem: `What is the core idea of Einstein's special relativity?
A) Time is absolute
B) The speed of light is the same for all observers
C) Mass cannot change
D) Energy is always conserved`,
        solution: 'B) The speed of light is the same for all observers',
        explanation: `This postulate leads to time dilation and length contraction.`
      }
    ],
    practiceQuestions: [
      {
        question: 'What happens to time for a moving observer (relative to a stationary one)?',
        options: ['Time speeds up', 'Time slows down', 'Time stays the same', 'Time reverses'],
        correctIndex: 1,
        explanation: 'Time dilation: moving clocks run slower.'
      },
      {
        question: 'What happens to the length of an object moving at high speed?',
        options: ['It increases', 'It decreases in the direction of motion', 'It stays the same', 'It oscillates'],
        correctIndex: 1,
        explanation: 'Length contraction: objects shorten along the direction of motion.'
      },
      {
        question: 'Two events that are simultaneous in one frame:',
        options: ['Are simultaneous in all frames', 'May not be simultaneous in another frame', 'Always happen at the same place', 'Cannot be observed'],
        correctIndex: 1,
        explanation: 'Simultaneity is relative—it depends on the observer\'s motion.'
      },
      {
        question: 'Why is E = mc² significant?',
        options: ['It proves energy is infinite', 'It shows mass and energy are equivalent', 'It only applies to light', 'It disproves quantum physics'],
        correctIndex: 1,
        explanation: 'A small amount of mass can release enormous energy (nuclear reactions).'
      },
      {
        question: 'GPS satellites must account for relativity because:',
        options: ['They move slowly', 'Time runs differently in orbit', 'They use quantum physics', 'They are very heavy'],
        correctIndex: 1,
        explanation: 'Without relativistic corrections, GPS would drift by kilometers per day.'
      },
      {
        question: 'In general relativity, gravity is described as:',
        options: ['A force between masses', 'Curvature of spacetime', 'Electromagnetic attraction', 'Quantum entanglement'],
        correctIndex: 1,
        explanation: 'Mass tells spacetime how to curve; spacetime tells mass how to move.'
      },
      {
        question: 'What is the maximum speed anything can travel?',
        options: ['Sound speed', 'Light speed', 'Infinite', 'Depends on mass'],
        correctIndex: 1,
        explanation: 'Nothing with mass can reach or exceed the speed of light.'
      },
      {
        question: 'What is the big picture of relativity?',
        options: ['Space and time are separate', 'Only energy matters', 'Space and time are unified into spacetime', 'Gravity is a force only'],
        correctIndex: 2,
        explanation: 'Relativity unifies space and time into spacetime.'
      }
    ]
  },
  'nuclear-physics': {
    title: 'Nükleer Fizik',
    titleEn: 'Nuclear Physics',
    concept: {
      native: `Nükleer fizik, atom çekirdeğinin yapısını ve davranışını inceleyen fizik dalıdır.

Temel kavramlar:
• Protonlar ve nötronlar (nükleonlar)
• Güçlü nükleer kuvvet
• Radyoaktif bozunma (alfa, beta, gama)
• Yarı ömür
• Nükleer fisyon ve füzyon
• Bağlanma enerjisi

Uygulamalar:
• Nükleer enerji
• Tıbbi görüntüleme
• Karbon tarihleme`,
      english: `Nuclear physics is the branch of physics that studies the structure and behavior of atomic nuclei.

Key concepts:
• Protons and neutrons (nucleons)
• Strong nuclear force
• Radioactive decay (alpha, beta, gamma)
• Half-life
• Nuclear fission and fusion
• Binding energy

Applications:
• Nuclear energy
• Medical imaging
• Carbon dating`
    },
    examples: [
      {
        problem: `What holds the nucleus together despite proton repulsion?
A) Gravitational force
B) Electromagnetic force
C) Strong nuclear force
D) Weak nuclear force`,
        solution: 'C) Strong nuclear force',
        explanation: `The strong nuclear force is much stronger than electromagnetic repulsion at short distances, binding protons and neutrons together.`
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the composition of an atomic nucleus?',
        options: ['Electrons and protons', 'Protons and neutrons', 'Only protons', 'Electrons and neutrons'],
        correctIndex: 1,
        explanation: 'The nucleus contains protons (positive) and neutrons (neutral).'
      },
      {
        question: 'What type of radiation consists of helium nuclei?',
        options: ['Alpha', 'Beta', 'Gamma', 'X-ray'],
        correctIndex: 0,
        explanation: 'Alpha particles are helium nuclei (2 protons + 2 neutrons).'
      },
      {
        question: 'What is half-life?',
        options: ['Time for all atoms to decay', 'Time for half the atoms to decay', 'Time for energy to double', 'Time for fusion to occur'],
        correctIndex: 1,
        explanation: 'Half-life is the time for half of a radioactive sample to decay.'
      },
      {
        question: 'Nuclear fission involves:',
        options: ['Combining light nuclei', 'Splitting heavy nuclei', 'Electron emission', 'Photon absorption'],
        correctIndex: 1,
        explanation: 'Fission splits heavy nuclei (like uranium) into lighter ones, releasing energy.'
      },
      {
        question: 'Nuclear fusion involves:',
        options: ['Splitting heavy nuclei', 'Combining light nuclei', 'Electron capture', 'Neutron decay'],
        correctIndex: 1,
        explanation: 'Fusion combines light nuclei (like hydrogen) into heavier ones, releasing energy.'
      },
      {
        question: 'Which process powers the Sun?',
        options: ['Fission', 'Fusion', 'Chemical burning', 'Radioactive decay'],
        correctIndex: 1,
        explanation: 'The Sun fuses hydrogen into helium, releasing enormous energy.'
      },
      {
        question: 'Binding energy per nucleon is highest for:',
        options: ['Very light nuclei', 'Very heavy nuclei', 'Medium-mass nuclei (like iron)', 'All nuclei equally'],
        correctIndex: 2,
        explanation: 'Iron-56 has the highest binding energy per nucleon, making it the most stable.'
      },
      {
        question: 'Nuclear physics impacts which areas?',
        options: ['Only weapons', 'Only energy', 'Energy, medicine, archaeology, and space science', 'Only space exploration'],
        correctIndex: 2,
        explanation: 'Nuclear physics impacts energy, medicine (PET, MRI), archaeology (carbon dating), and space science.'
      }
    ]
  },
  'dynamic-programming': {
    title: 'Dinamik Programlama',
    titleEn: 'Dynamic Programming',
    concept: {
      native: `Dinamik programlama, karmaşık problemleri daha küçük alt problemlere bölerek çözen bir algoritma tasarım tekniğidir.

Temel kavramlar:
• Örtüşen alt problemler
• Optimal alt yapı
• Memoization (üstten aşağı)
• Tabulation (alttan yukarı)

Klasik DP problemleri:
• Fibonacci sayıları
• En uzun ortak alt dizi
• Sırt çantası problemi
• En kısa yol algoritmaları`,
      english: `Dynamic programming is an algorithm design technique that solves complex problems by breaking them into smaller subproblems.

Key concepts:
• Overlapping subproblems
• Optimal substructure
• Memoization (top-down)
• Tabulation (bottom-up)

Classic DP problems:
• Fibonacci numbers
• Longest common subsequence
• Knapsack problem
• Shortest path algorithms`
    },
    examples: [
      {
        problem: `What is the main idea behind Dynamic Programming?
A) Solving problems by brute force
B) Dividing problems into independent subproblems
C) Solving overlapping subproblems and storing their results
D) Using recursion only`,
        solution: 'C) Solving overlapping subproblems and storing their results',
        explanation: `Dynamic Programming avoids repeated work by saving solutions to subproblems.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which situation best indicates that a problem is suitable for Dynamic Programming?',
        options: ['The problem has a single solution', 'The problem can be solved greedily', 'The problem has overlapping subproblems', 'The problem uses sorting'],
        correctIndex: 2,
        explanation: 'DP is powerful when the same subproblem appears many times.'
      },
      {
        question: 'Why is Dynamic Programming preferred over simple recursion when computing Fibonacci numbers?',
        options: ['Recursion cannot compute Fibonacci', 'DP reduces repeated calculations', 'DP uses less memory', 'DP avoids base cases'],
        correctIndex: 1,
        explanation: 'Recursive Fibonacci recalculates the same values repeatedly → inefficient.'
      },
      {
        question: 'The naive recursive Fibonacci algorithm has approximately:',
        options: ['Linear time complexity', 'Quadratic time complexity', 'Exponential time complexity', 'Constant time complexity'],
        correctIndex: 2,
        explanation: 'Without DP, Fibonacci grows exponentially in time.'
      },
      {
        question: 'What is the key difference between memoization and tabulation?',
        options: ['Memoization uses arrays, tabulation does not', 'Memoization is bottom-up, tabulation is top-down', 'Memoization is top-down, tabulation is bottom-up', 'They are identical'],
        correctIndex: 2,
        explanation: 'Memoization: recursion + cache. Tabulation: iterative table building.'
      },
      {
        question: 'A problem has optimal substructure if:',
        options: ['It has many solutions', 'It can be divided into independent tasks', 'An optimal solution can be built from optimal subsolutions', 'It requires sorting'],
        correctIndex: 2,
        explanation: 'This property is essential for DP.'
      },
      {
        question: 'Which of the following is a classic Dynamic Programming problem?',
        options: ['Binary search', 'Shortest path in a weighted graph', 'Finding the maximum element in an array', 'Sorting numbers'],
        correctIndex: 1,
        explanation: 'Shortest paths (e.g., Bellman-Ford) rely on DP principles.'
      },
      {
        question: 'Why is the Knapsack problem suited for Dynamic Programming?',
        options: ['Items are sorted', 'Choices are binary and overlapping', 'Greedy always works', 'There is only one constraint'],
        correctIndex: 1,
        explanation: 'Each decision (take or skip) creates overlapping subproblems.'
      },
      {
        question: 'Why can Dynamic Programming often be optimized to use less memory?',
        options: ['DP always uses recursion', 'Only the previous states are needed', 'DP problems are small', 'Memory is unlimited'],
        correctIndex: 1,
        explanation: 'Many DP tables only depend on recent rows or states.'
      },
      {
        question: 'Dynamic Programming is commonly used in:',
        options: ['Image compression', 'DNA sequence alignment', 'AI decision-making', 'All of the above'],
        correctIndex: 3,
        explanation: 'DP is foundational in bioinformatics, AI, NLP, and optimization.'
      },
      {
        question: 'When should Dynamic Programming be preferred over a greedy algorithm?',
        options: ['When greedy is faster', 'When greedy fails to guarantee optimality', 'When the problem is small', 'Always'],
        correctIndex: 1,
        explanation: 'Greedy works only when local choices guarantee global optimum.'
      },
      {
        question: 'What skill does Dynamic Programming primarily test?',
        options: ['Syntax memorization', 'Fast typing', 'Breaking complex problems into structured steps', 'Hardware knowledge'],
        correctIndex: 2,
        explanation: 'DP measures algorithmic thinking, not coding speed.'
      }
    ]
  },
  'advanced-algorithms': {
    title: 'İleri Algoritmalar',
    titleEn: 'Advanced Algorithms',
    concept: {
      native: `İleri algoritmalar, karmaşık problemleri verimli bir şekilde çözmek için kullanılan gelişmiş tekniklerdir.

Temel konular:
• Zaman karmaşıklığı ve Big-O notasyonu
• Böl ve fethet
• Açgözlü algoritmalar
• Graf algoritmaları
• NP problemleri
• Geri izleme`,
      english: `Advanced algorithms are sophisticated techniques used to solve complex problems efficiently.

Key topics:
• Time complexity and Big-O notation
• Divide and conquer
• Greedy algorithms
• Graph algorithms
• NP problems
• Backtracking`
    },
    examples: [
      {
        problem: `What does the time complexity of an algorithm describe?
A) The exact time an algorithm takes
B) The number of lines of code
C) How execution time grows with input size
D) The speed of the computer`,
        solution: 'C) How execution time grows with input size',
        explanation: `Time complexity measures scalability, not actual seconds.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which algorithm grows the slowest as input size increases?',
        options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(2ⁿ)'],
        correctIndex: 2,
        explanation: 'Linear time is more efficient than quadratic or exponential growth.'
      },
      {
        question: 'Which strategy breaks a problem into smaller independent parts, solves them, and combines the results?',
        options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
        correctIndex: 2,
        explanation: 'Classic examples: Merge Sort, Quick Sort.'
      },
      {
        question: 'Which sorting algorithm has an average-case time complexity of O(n log n)?',
        options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
        correctIndex: 2,
        explanation: 'Merge Sort guarantees O(n log n) in all cases.'
      },
      {
        question: 'Why do greedy algorithms sometimes fail?',
        options: ['They are too slow', 'They do not consider all possibilities', 'They always use recursion', 'They require extra memory'],
        correctIndex: 1,
        explanation: 'Greedy makes locally optimal choices that may not lead to a global optimum.'
      },
      {
        question: 'Which algorithm is commonly used to find the shortest path in a graph with non-negative edge weights?',
        options: ['Depth-First Search', 'Breadth-First Search', 'Dijkstra\'s Algorithm', 'Binary Search'],
        correctIndex: 2,
        explanation: 'Dijkstra\'s algorithm efficiently computes shortest paths.'
      },
      {
        question: 'Which statement is true about BFS vs DFS?',
        options: ['DFS always finds the shortest path', 'BFS uses a stack', 'BFS explores nodes level by level', 'DFS is always faster than BFS'],
        correctIndex: 2,
        explanation: 'BFS: queue, level-by-level. DFS: stack/recursion, depth-first.'
      },
      {
        question: 'Which statement best describes NP problems?',
        options: ['They can be solved quickly', 'They have no solutions', 'Solutions can be verified quickly', 'They require quantum computers'],
        correctIndex: 2,
        explanation: 'NP problems are hard to solve, but easy to verify.'
      },
      {
        question: 'Backtracking is best described as:',
        options: ['Always choosing the best option', 'Trying all possibilities efficiently by undoing choices', 'Using tables to store results', 'Sorting data repeatedly'],
        correctIndex: 1,
        explanation: 'Used in puzzles like N-Queens, Sudoku.'
      },
      {
        question: 'Which algorithmic technique is most suitable for problems with overlapping subproblems and optimal substructure?',
        options: ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Backtracking'],
        correctIndex: 2,
        explanation: 'This is the core condition for Dynamic Programming.'
      },
      {
        question: 'Which area heavily relies on advanced algorithms?',
        options: ['Search engines', 'Cryptography', 'Artificial Intelligence', 'All of the above'],
        correctIndex: 3,
        explanation: 'Algorithms power modern technology.'
      },
      {
        question: 'Which skill best represents algorithmic thinking?',
        options: ['Memorizing code', 'Writing fast programs', 'Structuring problems into clear logical steps', 'Using powerful computers'],
        correctIndex: 2,
        explanation: 'Algorithms test how you think, not how fast you type.'
      }
    ]
  },
  'ai-basics': {
    title: 'Yapay Zeka Temelleri',
    titleEn: 'Artificial Intelligence - Basics',
    concept: {
      native: `Yapay zeka, makinelerin insan benzeri zeka gerektiren görevleri yerine getirmesini sağlayan bilgisayar bilimi dalıdır.

Temel kavramlar:
• Dar YZ vs Genel YZ
• Makine öğrenmesi
• Denetimli ve denetimsiz öğrenme
• Eğitim verisi
• YZ önyargısı ve etik`,
      english: `Artificial intelligence is the branch of computer science that enables machines to perform tasks requiring human-like intelligence.

Key concepts:
• Narrow AI vs General AI
• Machine learning
• Supervised and unsupervised learning
• Training data
• AI bias and ethics`
    },
    examples: [
      {
        problem: `Which definition best describes Artificial Intelligence?
A) Computers that work faster than humans
B) Machines that can perform tasks requiring human-like intelligence
C) Robots that look like humans
D) Computers that store large amounts of data`,
        solution: 'B) Machines that can perform tasks requiring human-like intelligence',
        explanation: `AI focuses on intelligent behavior, not appearance or speed.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which of the following is an example of Narrow AI?',
        options: ['A robot that can perform any human task', 'A system that understands and learns all subjects', 'A chess-playing program', 'A conscious machine'],
        correctIndex: 2,
        explanation: 'Current AI systems are task-specific (narrow AI).'
      },
      {
        question: 'Which field is NOT a core component of Artificial Intelligence?',
        options: ['Machine Learning', 'Data Science', 'Human Psychology', 'Logic and Algorithms'],
        correctIndex: 2,
        explanation: 'AI draws inspiration from psychology, but it is not a core technical component.'
      },
      {
        question: 'What is Machine Learning?',
        options: ['Programming computers with fixed rules', 'Allowing machines to learn patterns from data', 'Storing data in databases', 'Teaching computers human emotions'],
        correctIndex: 1,
        explanation: 'ML systems learn from data, rather than following explicit instructions.'
      },
      {
        question: 'Which best describes supervised learning?',
        options: ['Learning without any data', 'Learning from labeled examples', 'Learning by trial and error only', 'Learning with no human involvement'],
        correctIndex: 1,
        explanation: 'Supervised learning uses input–output pairs.'
      },
      {
        question: 'Unsupervised learning is mainly used to:',
        options: ['Predict exact outcomes', 'Find hidden patterns in data', 'Control robots', 'Generate random numbers'],
        correctIndex: 1,
        explanation: 'Clustering and pattern discovery are key unsupervised tasks.'
      },
      {
        question: 'Why is training data important in AI systems?',
        options: ['It makes computers faster', 'It defines how the system behaves', 'It replaces algorithms', 'It removes errors completely'],
        correctIndex: 1,
        explanation: 'AI systems reflect the data they are trained on.'
      },
      {
        question: 'AI bias occurs when:',
        options: ['The algorithm is too slow', 'The model is trained on unbalanced or biased data', 'The computer overheats', 'The system uses mathematics'],
        correctIndex: 1,
        explanation: 'Biased data leads to biased decisions.'
      },
      {
        question: 'How do most AI systems make decisions?',
        options: ['By random guessing', 'By following human emotions', 'By optimizing mathematical objectives', 'By copying humans directly'],
        correctIndex: 2,
        explanation: 'AI optimizes objective functions based on data.'
      },
      {
        question: 'Which of the following uses AI?',
        options: ['Voice assistants', 'Recommendation systems', 'Medical image analysis', 'All of the above'],
        correctIndex: 3,
        explanation: 'AI is deeply embedded in daily life and science.'
      },
      {
        question: 'Which is a limitation of current AI systems?',
        options: ['They can think like humans', 'They understand context perfectly', 'They depend heavily on data quality', 'They are always unbiased'],
        correctIndex: 2,
        explanation: 'AI is only as good as the data and objectives it is given.'
      },
      {
        question: 'Why is ethics important in Artificial Intelligence?',
        options: ['AI systems are conscious', 'AI decisions can affect human lives', 'Ethics improves processing speed', 'Ethics replaces algorithms'],
        correctIndex: 1,
        explanation: 'AI impacts privacy, fairness, and opportunity, especially in education.'
      }
    ]
  },
  'cryptography-intro': {
    title: 'Kriptografiye Giriş',
    titleEn: 'Introduction to Cryptography',
    concept: {
      native: `Kriptografi, iletişim ve verilerin güvenliğini sağlayan bilim dalıdır.

Temel kavramlar:
• Düz metin ve şifreli metin
• Simetrik şifreleme (tek anahtar)
• Asimetrik şifreleme (açık/özel anahtar çifti)
• Hash fonksiyonları
• Dijital imzalar
• HTTPS ve güvenli iletişim`,
      english: `Cryptography is the science of securing communication and data.

Key concepts:
• Plaintext and ciphertext
• Symmetric encryption (single key)
• Asymmetric encryption (public/private key pair)
• Hash functions
• Digital signatures
• HTTPS and secure communication`
    },
    examples: [
      {
        problem: `What is the primary purpose of cryptography?
A) Making computers faster
B) Hiding information permanently
C) Securing communication and data
D) Compressing files`,
        solution: 'C) Securing communication and data',
        explanation: `Cryptography ensures confidentiality, integrity, and authenticity of information.`
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the correct relationship between plaintext and ciphertext?',
        options: ['Ciphertext is readable text', 'Plaintext is encrypted text', 'Ciphertext is encrypted plaintext', 'Plaintext and ciphertext are identical'],
        correctIndex: 2,
        explanation: 'Plaintext → encryption → ciphertext → decryption → plaintext.'
      },
      {
        question: 'In symmetric-key cryptography:',
        options: ['Two different keys are used', 'The same key is used for encryption and decryption', 'No key is required', 'Only public keys are used'],
        correctIndex: 1,
        explanation: 'Sender and receiver share one secret key.'
      },
      {
        question: 'Which feature distinguishes asymmetric cryptography from symmetric cryptography?',
        options: ['It is faster', 'It uses one key only', 'It uses a public–private key pair', 'It does not use mathematics'],
        correctIndex: 2,
        explanation: 'Asymmetric systems (e.g., RSA) use two mathematically linked keys.'
      },
      {
        question: 'What can be safely shared with anyone?',
        options: ['Private key', 'Symmetric key', 'Public key', 'Password'],
        correctIndex: 2,
        explanation: 'Public keys are designed to be openly distributed.'
      },
      {
        question: 'What is the main property of a cryptographic hash function?',
        options: ['It can be reversed easily', 'It always produces different outputs', 'It produces a fixed-size output', 'It encrypts data'],
        correctIndex: 2,
        explanation: 'Hashes map input data to a fixed-length "fingerprint".'
      },
      {
        question: 'Why are passwords stored as hashes instead of plaintext?',
        options: ['Hashes use less memory', 'Hashes are faster', 'Hashes protect passwords even if data is leaked', 'Hashes can be decrypted easily'],
        correctIndex: 2,
        explanation: 'Even if a database is compromised, hashed passwords remain protected.'
      },
      {
        question: 'What is the main purpose of a digital signature?',
        options: ['Encrypt data', 'Compress messages', 'Verify authenticity and integrity', 'Hide sender identity'],
        correctIndex: 2,
        explanation: 'Digital signatures confirm who sent the message and that it wasn\'t altered.'
      },
      {
        question: 'A man-in-the-middle attack occurs when:',
        options: ['A computer overheats', 'An attacker intercepts communication between two parties', 'A password is forgotten', 'A system crashes'],
        correctIndex: 1,
        explanation: 'The attacker secretly listens or alters communication.'
      },
      {
        question: 'Why is HTTPS important?',
        options: ['It speeds up websites', 'It encrypts communication between browser and server', 'It blocks ads', 'It hides the website'],
        correctIndex: 1,
        explanation: 'HTTPS uses cryptography to ensure secure web communication.'
      },
      {
        question: 'Which problem does cryptography help solve on the internet?',
        options: ['Network speed', 'Trust between unknown parties', 'Hardware failures', 'Software updates'],
        correctIndex: 1,
        explanation: 'Cryptography enables secure interaction without prior trust.'
      },
      {
        question: 'Why is cryptography essential in the modern digital world?',
        options: ['It makes computers smarter', 'It protects privacy, security, and digital economies', 'It replaces passwords', 'It only applies to governments'],
        correctIndex: 1,
        explanation: 'Cryptography underpins banking, messaging, blockchain, and national security.'
      }
    ]
  }
};

// Default content for topics without specific content
const defaultContent = {
  title: 'Topic',
  titleEn: 'Topic',
  concept: {
    native: 'Bu konu için içerik yakında eklenecektir. Daha fazla konu aşamalı olarak eklenecektir.',
    english: 'Content for this topic will be added soon. More topics will be added progressively.'
  },
  examples: [],
  practiceQuestions: []
};

// Available languages
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export default function TopicPage() {
  const { subject, grade, topicId } = useParams<{ subject: string; grade: string; topicId: string }>();
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang') || 'en';
  
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [showGovernanceDropdown, setShowGovernanceDropdown] = useState(false);
  const [showStudentsDropdown, setShowStudentsDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'concept' | 'examples' | 'practice'>('concept');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const subjectInfo = subject ? subjectMeta[subject] : null;
  const content = topicId ? (topicContent[topicId] || defaultContent) : defaultContent;
  const currentLanguage = languages.find(l => l.code === selectedLanguage) || languages[0];
  const Icon = subjectInfo?.icon || BookOpen;

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleCheckAnswer = (questionIndex: number) => {
    setShowResults(prev => ({ ...prev, [questionIndex]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <Link to="/" className="flex items-center gap-3 mr-8">
            <img src="/wsc-logo-full.png" alt="World STEM Cup" className="h-32 object-contain -my-8" />
          </Link>
          <div className="hidden md:flex items-center gap-8 flex-1">
            <Link to="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</Link>
            <Link to="/how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">How It Works</Link>
            <Link to="/parents-schools" className="text-sm text-white/70 hover:text-white transition-colors">Parents & Schools</Link>
            <Link to="/education-fund" className="text-sm text-white/70 hover:text-white transition-colors">Education Fund</Link>
            <Link to="/sponsors" className="text-sm text-white/70 hover:text-white transition-colors">Sponsors</Link>
            
            {/* Students Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowStudentsDropdown(v => !v); setShowGovernanceDropdown(false); setShowCompetitionDropdown(false); }}
                className="text-sm text-white font-medium hover:text-white transition-colors flex items-center gap-1"
              >
                <GraduationCap className="w-4 h-4" />
                Students
                <ChevronDown className={`w-3 h-3 transition-transform ${showStudentsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showStudentsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  <Link 
                    to="/students/study-practice"
                    onClick={() => setShowStudentsDropdown(false)}
                    className="block px-4 py-2 text-sm text-white font-medium hover:bg-white/5 transition-colors"
                  >
                    Study & Practice
                  </Link>
                  <Link 
                    to="/students/for-students"
                    onClick={() => setShowStudentsDropdown(false)}
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    For Students
                  </Link>
                </div>
              )}
            </div>
            
            {/* Governance Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowGovernanceDropdown(v => !v); setShowCompetitionDropdown(false); setShowStudentsDropdown(false); }}
                className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
              >
                <Shield className="w-4 h-4" />
                Governance
                <ChevronDown className={`w-3 h-3 transition-transform ${showGovernanceDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showGovernanceDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  <Link to="/governance" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Overview</Link>
                  <Link to="/governance/academic-independence" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Academic Independence</Link>
                  <Link to="/governance/conflict-of-interest" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Conflict of Interest</Link>
                  <Link to="/governance/data-protection-child-safety" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Data Protection & Child Safety</Link>
                  <Link to="/governance/organizational-structure" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Organizational Structure</Link>
                </div>
              )}
            </div>
            
            {/* Competition Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowCompetitionDropdown(v => !v); setShowGovernanceDropdown(false); setShowStudentsDropdown(false); }}
                className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                Competition
                <ChevronDown className={`w-3 h-3 transition-transform ${showCompetitionDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCompetitionDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  <Link to="/world" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Overview</Link>
                  <Link to="/states" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">All States</Link>
                  <Link to="/state/MD" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Maryland Pilot</Link>
                  <Link to="/dodea" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">DoDEA Schools</Link>
                  <Link to="/bracket/current" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Playoff Bracket</Link>
                  <Link to="/leaderboard" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Leaderboard</Link>
                  <div className="border-t border-white/10 my-1"></div>
                  <Link to="/find-schools" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Find Schools</Link>
                </div>
              )}
            </div>
          </div>
          <Link 
            to="/register/school-admin" 
            className="bg-gradient-to-r from-[#4361ee] to-[#f72585] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Register Now
          </Link>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* Breadcrumb & Language Selector */}
      <section className="py-4 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/students/study-practice" className="text-white/50 hover:text-white transition-colors">
              Study & Practice
            </Link>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white/50">Grade {grade}</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white/50">{subjectInfo?.name}</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white">{selectedLanguage === 'en' ? content.titleEn : content.title}</span>
          </div>
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <Languages className="w-4 h-4" />
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setSelectedLanguage(lang.code); setShowLanguageDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-2 ${selectedLanguage === lang.code ? 'text-white bg-white/10' : 'text-white/70'}`}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Topic Header */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/students/study-practice"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${subjectInfo?.color || 'from-blue-500 to-blue-700'}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/50 mb-1">
                Grade {grade} • {subjectInfo?.name}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {selectedLanguage === 'en' ? content.titleEn : content.title}
              </h1>
              {selectedLanguage !== 'en' && (
                <div className="text-sm text-white/50 mt-1">
                  {content.titleEn}
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('concept')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'concept' 
                  ? 'bg-gradient-to-r from-[#4361ee] to-[#7c3aed] text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <FileText className="w-4 h-4" />
              Concept
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'examples' 
                  ? 'bg-gradient-to-r from-[#4361ee] to-[#7c3aed] text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Play className="w-4 h-4" />
              Examples ({content.examples.length})
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'practice' 
                  ? 'bg-gradient-to-r from-[#4361ee] to-[#7c3aed] text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Practice ({content.practiceQuestions.length})
            </button>
          </div>

          {/* Content */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {/* Concept Tab */}
            {activeTab === 'concept' && (
              <div className="p-6 md:p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
                    {selectedLanguage === 'en' ? content.concept.english : content.concept.native}
                  </div>
                  
                  {selectedLanguage !== 'en' && (
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                        <Languages className="w-4 h-4" />
                        English Version
                      </div>
                      <div className="whitespace-pre-wrap text-white/60 leading-relaxed text-sm">
                        {content.concept.english}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Examples Tab */}
            {activeTab === 'examples' && (
              <div className="p-6 md:p-8">
                {content.examples.length > 0 ? (
                  <div className="space-y-8">
                    {content.examples.map((example, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                          <span className="bg-white/10 px-2 py-1 rounded font-mono">Example {index + 1}</span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm text-white/50 mb-1">Problem</div>
                          <div className="text-xl font-mono bg-white/5 px-4 py-3 rounded-lg">
                            {example.problem}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm text-white/50 mb-1">Solution</div>
                          <div className="text-xl font-bold text-green-400">
                            {example.solution}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-white/50 mb-2">Step-by-step Explanation</div>
                          <div className="whitespace-pre-wrap text-white/70 bg-white/5 px-4 py-3 rounded-lg font-mono text-sm">
                            {example.explanation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/50">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Examples will be added soon.</p>
                  </div>
                )}
              </div>
            )}

            {/* Practice Tab */}
            {activeTab === 'practice' && (
              <div className="p-6 md:p-8">
                {content.practiceQuestions.length > 0 ? (
                  <div className="space-y-6">
                    {content.practiceQuestions.map((q, qIndex) => {
                      const isAnswered = selectedAnswers[qIndex] !== undefined;
                      const isCorrect = selectedAnswers[qIndex] === q.correctIndex;
                      const showResult = showResults[qIndex];
                      
                      return (
                        <div key={qIndex} className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                            <span className="bg-white/10 px-2 py-1 rounded font-mono">Question {qIndex + 1}</span>
                          </div>
                          
                          <div className="text-lg mb-4">{q.question}</div>
                          
                          <div className="space-y-2 mb-4">
                            {q.options.map((option, oIndex) => {
                              const isSelected = selectedAnswers[qIndex] === oIndex;
                              const isCorrectOption = oIndex === q.correctIndex;
                              
                              let optionClass = 'bg-white/5 hover:bg-white/10 border-white/10';
                              if (showResult) {
                                if (isCorrectOption) {
                                  optionClass = 'bg-green-500/20 border-green-500/50';
                                } else if (isSelected && !isCorrectOption) {
                                  optionClass = 'bg-red-500/20 border-red-500/50';
                                }
                              } else if (isSelected) {
                                optionClass = 'bg-[#4361ee]/20 border-[#4361ee]/50';
                              }
                              
                              return (
                                <button
                                  key={oIndex}
                                  onClick={() => !showResult && handleAnswerSelect(qIndex, oIndex)}
                                  disabled={showResult}
                                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center gap-3 ${optionClass}`}
                                >
                                  <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-sm">
                                    {String.fromCharCode(65 + oIndex)}
                                  </span>
                                  <span className="flex-1">{option}</span>
                                  {showResult && isCorrectOption && (
                                    <Check className="w-5 h-5 text-green-400" />
                                  )}
                                  {showResult && isSelected && !isCorrectOption && (
                                    <X className="w-5 h-5 text-red-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          
                          {!showResult && isAnswered && (
                            <button
                              onClick={() => handleCheckAnswer(qIndex)}
                              className="bg-gradient-to-r from-[#4361ee] to-[#7c3aed] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                              Check Answer
                            </button>
                          )}
                          
                          {showResult && (
                            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                              <div className="flex items-center gap-2 mb-2">
                                {isCorrect ? (
                                  <>
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="font-medium text-green-400">Correct!</span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-5 h-5 text-red-400" />
                                    <span className="font-medium text-red-400">Incorrect</span>
                                  </>
                                )}
                              </div>
                              <div className="text-sm text-white/70">
                                <strong>Explanation:</strong> {q.explanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/50">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Practice questions will be added soon.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Competition Alignment Notice */}
      <section className="py-6 px-6 bg-gradient-to-r from-[#4361ee]/10 to-[#f72585]/10 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/70">
            Practice content is aligned with World STEM Cup reasoning style and difficulty level, but practice scores do not affect competition results.
          </p>
        </div>
      </section>

      {/* AI Usage Notice */}
      <section className="py-8 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/50">
            <strong className="text-white/70">AI Usage Policy:</strong> AI is for learning only. 
            AI is never used during competitions. No student data is used for model training.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-white/50 text-sm">
          <p>&copy; 2025 World STEM Cup. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {' | '}
            <Link to="/governance" className="hover:text-white transition-colors">Governance</Link>
            {' | '}
            <Link to="/governance/data-protection-child-safety" className="hover:text-white transition-colors">Data Protection & Child Safety</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
