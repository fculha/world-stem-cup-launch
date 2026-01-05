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
  },
  'molecular-biology': {
    title: 'Moleküler Biyoloji',
    titleEn: 'Molecular Biology',
    concept: {
      native: `Moleküler biyoloji, hücrelerin moleküler düzeydeki işleyişini inceleyen bilim dalıdır.

Temel kavramlar:
• Merkezi dogma: DNA → RNA → Protein
• DNA yapısı ve replikasyonu
• Transkripsiyon ve translasyon
• Genetik kod
• Mutasyonlar
• Gen regülasyonu`,
      english: `Molecular biology is the branch of biology that studies the molecular basis of cellular processes.

Key concepts:
• Central dogma: DNA → RNA → Protein
• DNA structure and replication
• Transcription and translation
• Genetic code
• Mutations
• Gene regulation`
    },
    examples: [
      {
        problem: `The central dogma of molecular biology describes the flow of genetic information as:
A) Protein → DNA → RNA
B) RNA → DNA → Protein
C) DNA → RNA → Protein
D) DNA → Protein → RNA`,
        solution: 'C) DNA → RNA → Protein',
        explanation: `Genetic information is transcribed from DNA to RNA and translated into protein.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which statement correctly describes DNA structure?',
        options: ['Single-stranded helix', 'Double helix with antiparallel strands', 'Circular protein chain', 'Triple helix'],
        correctIndex: 1,
        explanation: 'DNA consists of two antiparallel strands forming a double helix.'
      },
      {
        question: 'Which base pairing is correct in DNA?',
        options: ['A–G', 'C–T', 'A–T', 'G–T'],
        correctIndex: 2,
        explanation: 'Adenine pairs with Thymine via hydrogen bonds; Cytosine pairs with Guanine.'
      },
      {
        question: 'Which enzyme is responsible for synthesizing the new DNA strand?',
        options: ['Helicase', 'DNA ligase', 'DNA polymerase', 'RNA polymerase'],
        correctIndex: 2,
        explanation: 'DNA polymerase adds nucleotides in the 5′ → 3′ direction.'
      },
      {
        question: 'Which type of RNA carries amino acids to the ribosome?',
        options: ['mRNA', 'rRNA', 'tRNA', 'snRNA'],
        correctIndex: 2,
        explanation: 'tRNA matches codons with the correct amino acids during translation.'
      },
      {
        question: 'Which process converts genetic information into a functional protein?',
        options: ['Replication', 'Transcription', 'Translation', 'Mutation'],
        correctIndex: 2,
        explanation: 'Translation reads mRNA codons to build a polypeptide.'
      },
      {
        question: 'Why is the genetic code described as "universal"?',
        options: ['All organisms have identical DNA', 'Most organisms use the same codons for the same amino acids', 'All proteins are identical', 'DNA does not mutate'],
        correctIndex: 1,
        explanation: 'With few exceptions, codons specify the same amino acids across life.'
      },
      {
        question: 'Which mutation is most likely to have no effect on the protein?',
        options: ['Frameshift mutation', 'Nonsense mutation', 'Silent mutation', 'Large deletion'],
        correctIndex: 2,
        explanation: 'A silent mutation does not change the amino acid due to codon redundancy.'
      },
      {
        question: 'Gene expression is regulated primarily to:',
        options: ['Increase mutation rates', 'Save cellular energy and resources', 'Eliminate DNA', 'Change species'],
        correctIndex: 1,
        explanation: 'Cells express genes only when needed to maintain efficiency.'
      },
      {
        question: 'In the lac operon, genes involved in lactose metabolism are:',
        options: ['Always active', 'Always inactive', 'Activated only when lactose is present', 'Controlled by ribosomes'],
        correctIndex: 2,
        explanation: 'The lac operon is an inducible system—turned on by lactose.'
      },
      {
        question: 'Which technique is used to amplify a specific DNA segment?',
        options: ['Gel electrophoresis', 'DNA sequencing', 'PCR', 'Cloning'],
        correctIndex: 2,
        explanation: 'PCR (Polymerase Chain Reaction) rapidly copies DNA segments.'
      },
      {
        question: 'Why is molecular biology fundamental to modern medicine?',
        options: ['It explains ecosystems', 'It enables gene therapy, diagnostics, and vaccines', 'It replaces chemistry', 'It studies fossils'],
        correctIndex: 1,
        explanation: 'Molecular biology underpins genomics, cancer research, and personalized medicine.'
      }
    ]
  },
  'biotechnology': {
    title: 'Biyoteknoloji',
    titleEn: 'Biotechnology',
    concept: {
      native: `Biyoteknoloji, canlı organizmaları veya biyolojik sistemleri kullanarak yararlı ürünler geliştiren bilim dalıdır.

Temel kavramlar:
• Rekombinant DNA teknolojisi
• Plazmidler ve gen transferi
• PCR ve jel elektroforezi
• CRISPR-Cas9 gen düzenleme
• GDO'lar
• Gen terapisi ve kök hücreler`,
      english: `Biotechnology is the use of living organisms or biological systems to develop useful products.

Key concepts:
• Recombinant DNA technology
• Plasmids and gene transfer
• PCR and gel electrophoresis
• CRISPR-Cas9 gene editing
• GMOs
• Gene therapy and stem cells`
    },
    examples: [
      {
        problem: `Biotechnology is best defined as:
A) The study of ecosystems
B) The use of living organisms or biological systems to develop useful products
C) The classification of organisms
D) The study of fossils`,
        solution: 'B) The use of living organisms or biological systems to develop useful products',
        explanation: `Biotechnology applies biology to technology, from medicine to agriculture.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Recombinant DNA technology involves:',
        options: ['Destroying DNA', 'Mixing proteins', 'Combining DNA from different sources', 'Cloning whole organisms'],
        correctIndex: 2,
        explanation: 'Genes from different organisms are combined to produce new traits or products.'
      },
      {
        question: 'Plasmids are primarily used in biotechnology because they:',
        options: ['Produce energy', 'Act as vectors to transfer genes', 'Control mutations', 'Are part of the nucleus'],
        correctIndex: 1,
        explanation: 'Plasmids are circular DNA molecules used as gene carriers, especially in bacteria.'
      },
      {
        question: 'Why is genetically engineered bacteria used to produce human insulin?',
        options: ['It is cheaper and safer than animal insulin', 'Humans cannot produce insulin', 'Bacteria naturally produce insulin', 'Insulin does not work in humans'],
        correctIndex: 0,
        explanation: 'Recombinant insulin is identical to human insulin, reducing allergic reactions.'
      },
      {
        question: 'The main purpose of PCR is to:',
        options: ['Separate DNA fragments', 'Cut DNA', 'Amplify DNA', 'Sequence DNA'],
        correctIndex: 2,
        explanation: 'PCR makes millions of copies of a specific DNA segment.'
      },
      {
        question: 'Gel electrophoresis separates DNA fragments based on:',
        options: ['Color', 'Shape', 'Electrical charge only', 'Size'],
        correctIndex: 3,
        explanation: 'Smaller DNA fragments move faster through the gel.'
      },
      {
        question: 'CRISPR-Cas9 technology is primarily used for:',
        options: ['DNA replication', 'DNA sequencing', 'Precise gene editing', 'Protein folding'],
        correctIndex: 2,
        explanation: 'CRISPR allows targeted modification of specific genes.'
      },
      {
        question: 'A genetically modified organism (GMO) is:',
        options: ['An organism exposed to radiation', 'An organism with DNA altered using biotechnology', 'A cloned organism', 'An extinct species'],
        correctIndex: 1,
        explanation: 'GMOs contain introduced or modified genes for desired traits.'
      },
      {
        question: 'Which application is an example of medical biotechnology?',
        options: ['Biofuels', 'Pest-resistant crops', 'Gene therapy', 'Composting'],
        correctIndex: 2,
        explanation: 'Gene therapy aims to treat diseases at the genetic level.'
      },
      {
        question: 'Stem cells are important because they:',
        options: ['Cannot divide', 'Can differentiate into specialized cell types', 'Only exist in plants', 'Cause mutations'],
        correctIndex: 1,
        explanation: 'Stem cells have self-renewal and differentiation abilities.'
      },
      {
        question: 'Which is a major ethical concern in biotechnology?',
        options: ['Speed of computers', 'Gene editing in humans', 'DNA size', 'Bacterial growth'],
        correctIndex: 1,
        explanation: 'Human gene editing raises concerns about equity, consent, and long-term effects.'
      },
      {
        question: 'Bioremediation refers to:',
        options: ['Medical treatment', 'Cleaning pollutants using organisms', 'DNA sequencing', 'Crop breeding'],
        correctIndex: 1,
        explanation: 'Microorganisms are used to break down environmental pollutants.'
      },
      {
        question: 'Which biotechnology advancement has the greatest potential to impact global health equity?',
        options: ['Designer pets', 'Gene editing for cosmetic traits', 'Affordable vaccine production', 'Luxury pharmaceuticals'],
        correctIndex: 2,
        explanation: 'Low-cost vaccines can save millions of lives globally.'
      }
    ]
  },
  'bioinformatics': {
    title: 'Biyoinformatik',
    titleEn: 'Bioinformatics',
    concept: {
      native: `Biyoinformatik, biyolojik verileri analiz etmek için bilgisayar bilimi ve istatistik uygulayan disiplinler arası bir alandır.

Temel kavramlar:
• Genom dizileme
• Dizi hizalama
• BLAST araçları
• Protein yapı tahmini
• Filogenetik ağaçlar
• Kişiselleştirilmiş tıp`,
      english: `Bioinformatics is an interdisciplinary field that applies computer science and statistics to analyze biological data.

Key concepts:
• Genome sequencing
• Sequence alignment
• BLAST tools
• Protein structure prediction
• Phylogenetic trees
• Personalized medicine`
    },
    examples: [
      {
        problem: `Bioinformatics is best described as:
A) The study of fossils using computers
B) The application of computer science and statistics to analyze biological data
C) The design of laboratory equipment
D) The study of animal behavior`,
        solution: 'B) The application of computer science and statistics to analyze biological data',
        explanation: `Bioinformatics combines biology, computer science, and data analysis to interpret complex biological data.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which of the following is most commonly analyzed in bioinformatics?',
        options: ['Rock layers', 'DNA and protein sequences', 'Climate maps', 'Electrical circuits'],
        correctIndex: 1,
        explanation: 'Genomic and proteomic sequences are core bioinformatics data types.'
      },
      {
        question: 'Genome sequencing refers to:',
        options: ['Editing genes', 'Measuring protein mass', 'Determining the complete DNA sequence of an organism', 'Counting chromosomes'],
        correctIndex: 2,
        explanation: 'Sequencing reveals the exact order of nucleotides in DNA.'
      },
      {
        question: 'Which is an example of a biological database?',
        options: ['Google Maps', 'GenBank', 'Excel', 'Photoshop'],
        correctIndex: 1,
        explanation: 'GenBank stores publicly available DNA sequences used worldwide.'
      },
      {
        question: 'The main purpose of sequence alignment is to:',
        options: ['Increase mutation rates', 'Identify similarities between biological sequences', 'Delete genes', 'Speed up cell division'],
        correctIndex: 1,
        explanation: 'Alignment helps identify evolutionary relationships and functional regions.'
      },
      {
        question: 'BLAST is primarily used to:',
        options: ['Edit DNA', 'Compare a sequence against a database', 'Simulate protein folding', 'Visualize cells'],
        correctIndex: 1,
        explanation: 'BLAST finds similar sequences in large biological databases.'
      },
      {
        question: 'Why is protein structure prediction important?',
        options: ['Proteins have no structure', 'Structure determines protein function', 'It speeds up DNA replication', 'Proteins are only decorative'],
        correctIndex: 1,
        explanation: 'A protein\'s 3D structure directly affects its biological role.'
      },
      {
        question: 'Why are algorithms critical in bioinformatics?',
        options: ['Biological data is small', 'Manual analysis is faster', 'Biological datasets are extremely large and complex', 'Algorithms replace experiments'],
        correctIndex: 2,
        explanation: 'Genomic data is too large for manual processing.'
      },
      {
        question: 'Phylogenetic trees are used to:',
        options: ['Predict protein folding', 'Show evolutionary relationships', 'Measure enzyme speed', 'Store DNA'],
        correctIndex: 1,
        explanation: 'They visualize evolutionary distance and ancestry.'
      },
      {
        question: 'Which application best represents bioinformatics in medicine?',
        options: ['Vaccine distribution', 'Personalized medicine based on genetic profiles', 'Blood pressure measurement', 'Surgical robotics'],
        correctIndex: 1,
        explanation: 'Bioinformatics enables precision medicine using genetic data.'
      },
      {
        question: 'A mutation appears repeatedly in patients with the same disease. What is the most reasonable bioinformatics conclusion?',
        options: ['The mutation is random', 'The mutation may be linked to the disease', 'The disease is environmental only', 'The data is useless'],
        correctIndex: 1,
        explanation: 'Recurrent mutations suggest potential disease association.'
      },
      {
        question: 'Which is a major ethical concern in bioinformatics?',
        options: ['Computer speed', 'Data storage cost', 'Genetic privacy and data security', 'DNA size'],
        correctIndex: 2,
        explanation: 'Genomic data is highly sensitive and must be protected.'
      },
      {
        question: 'Which bioinformatics advancement has the greatest long-term global impact?',
        options: ['Faster gaming processors', 'DNA-based ancestry tests for entertainment', 'Early disease detection through genomic analysis', 'Cosmetic gene screening'],
        correctIndex: 2,
        explanation: 'Early detection can save lives and reduce healthcare inequality.'
      }
    ]
  },
  'research-methodology': {
    title: 'Araştırma Metodolojisi',
    titleEn: 'Research Methodology',
    concept: {
      native: `Araştırma metodolojisi, bilimsel araştırmanın sistematik yürütülmesini sağlayan ilke ve yöntemlerdir.

Temel kavramlar:
• Bilimsel yöntem
• Hipotez oluşturma
• Değişkenler (bağımsız, bağımlı, kontrol)
• Kontrol grubu
• Korelasyon ve nedensellik
• Örneklem büyüklüğü ve önyargı`,
      english: `Research methodology encompasses the principles and methods for conducting scientific research systematically.

Key concepts:
• Scientific method
• Hypothesis formation
• Variables (independent, dependent, controlled)
• Control group
• Correlation vs causation
• Sample size and bias`
    },
    examples: [
      {
        problem: `Which sequence correctly represents the scientific method?
A) Conclusion → Hypothesis → Observation → Experiment
B) Observation → Hypothesis → Experiment → Conclusion
C) Experiment → Observation → Theory → Law
D) Hypothesis → Conclusion → Observation → Data`,
        solution: 'B) Observation → Hypothesis → Experiment → Conclusion',
        explanation: `Science begins with observation and continues with a testable hypothesis.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which statement best describes a scientific hypothesis?',
        options: ['A proven explanation', 'A guess with no evidence', 'A testable and falsifiable explanation', 'A scientific law'],
        correctIndex: 2,
        explanation: 'A hypothesis must be testable and falsifiable.'
      },
      {
        question: 'In an experiment, the variable that is intentionally changed is called:',
        options: ['Dependent variable', 'Controlled variable', 'Independent variable', 'Confounding variable'],
        correctIndex: 2,
        explanation: 'The independent variable is the factor intentionally changed in an experiment.'
      },
      {
        question: 'Why is a control group important in an experiment?',
        options: ['To increase sample size', 'To eliminate all variables', 'To provide a baseline for comparison', 'To confirm the hypothesis'],
        correctIndex: 2,
        explanation: 'The control group shows whether the effect truly comes from the independent variable.'
      },
      {
        question: 'A study shows that students who study more get higher grades. What can be concluded?',
        options: ['Studying causes intelligence', 'Higher grades cause studying', 'There is a correlation, not necessarily causation', 'The data proves causation'],
        correctIndex: 2,
        explanation: 'Correlation does not equal causation. This is a critical distinction in competitions.'
      },
      {
        question: 'Which situation introduces bias into a study?',
        options: ['Random sampling', 'Double-blind design', 'Researcher influencing participants', 'Large sample size'],
        correctIndex: 2,
        explanation: 'Researcher influence can distort results.'
      },
      {
        question: 'Why is a larger sample size generally preferred?',
        options: ['It guarantees correct results', 'It reduces random error', 'It eliminates bias', 'It makes experiments faster'],
        correctIndex: 1,
        explanation: 'Larger sample size increases statistical reliability.'
      },
      {
        question: 'A scientific result is considered strong if:',
        options: ['It is published once', 'It is confirmed by repeated independent experiments', 'It supports existing beliefs', 'It is complex'],
        correctIndex: 1,
        explanation: 'Scientific confidence comes from reproducibility.'
      },
      {
        question: 'The main purpose of peer review is to:',
        options: ['Promote famous scientists', 'Increase publication speed', 'Evaluate research quality and validity', 'Approve funding'],
        correctIndex: 2,
        explanation: 'Peer review is the scientific quality control mechanism.'
      },
      {
        question: 'An experiment produces unexpected results. What is the most scientific response?',
        options: ['Discard the data', 'Adjust the hypothesis', 'Repeat the experiment and analyze errors', 'Change the conclusion to fit expectations'],
        correctIndex: 2,
        explanation: 'Science is not adjusted to fit results; results are analyzed.'
      },
      {
        question: 'Which action violates scientific ethics?',
        options: ['Reporting negative results', 'Repeating experiments', 'Manipulating data to fit a hypothesis', 'Citing previous studies'],
        correctIndex: 2,
        explanation: 'Manipulating data is scientific fraud.'
      },
      {
        question: 'The null hypothesis assumes that:',
        options: ['The experiment will succeed', 'There is no effect or difference', 'The theory is true', 'The data is invalid'],
        correctIndex: 1,
        explanation: 'In statistics, the starting point is the assumption that "there is no effect."'
      },
      {
        question: 'Which statement best represents scientific thinking?',
        options: ['"This must be true because it feels logical."', '"If the data contradicts my idea, the data is wrong."', '"Conclusions must be revised when new evidence appears."', '"Authority determines correctness."'],
        correctIndex: 2,
        explanation: 'Science is a dynamic and self-correcting process.'
      }
    ]
  },
  'peer-review': {
    title: 'Hakemli Değerlendirme',
    titleEn: 'Peer Review',
    concept: {
      native: `Hakemli değerlendirme, bilimsel araştırmaların yayınlanmadan önce bağımsız uzmanlar tarafından değerlendirilmesi sürecidir.

Temel kavramlar:
• Kalite kontrolü
• Çift kör değerlendirme
• Hakem sorumlulukları
• Yayın sonrası değerlendirme
• Açık hakemlik
• Etik standartlar`,
      english: `Peer review is the process by which scientific research is evaluated by independent experts before publication.

Key concepts:
• Quality control
• Double-blind review
• Reviewer responsibilities
• Post-publication review
• Open peer review
• Ethical standards`
    },
    examples: [
      {
        problem: `What is the primary purpose of the peer review process?
A) To approve funding for research
B) To determine the popularity of a study
C) To evaluate the quality, validity, and integrity of research
D) To speed up publication`,
        solution: 'C) To evaluate the quality, validity, and integrity of research',
        explanation: `Peer review functions as a quality control system in science. It evaluates the validity, methodology, and significance of research before it becomes part of the scientific record.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Peer reviewers are typically:',
        options: ['Journal editors', 'Government officials', 'Independent experts in the same field', 'Students in the discipline'],
        correctIndex: 2,
        explanation: 'Peer reviewers are independent subject-matter experts who assess the scientific merit of research within their field of expertise.'
      },
      {
        question: 'What is the main advantage of a double-blind peer review process?',
        options: ['Faster publication', 'Increased citation count', 'Reduced bias from author or reviewer identity', 'Guaranteed acceptance'],
        correctIndex: 2,
        explanation: 'Double-blind review reduces bias by concealing the identities of both authors and reviewers, allowing evaluation based solely on scientific quality.'
      },
      {
        question: 'Which of the following is NOT a responsibility of a peer reviewer?',
        options: ['Assessing methodology', 'Evaluating data interpretation', 'Rewriting the paper for the authors', 'Identifying ethical concerns'],
        correctIndex: 2,
        explanation: 'Reviewers assess and critique research but do not rewrite papers. Authors remain responsible for revisions and final content.'
      },
      {
        question: 'A paper rejected after peer review most commonly means:',
        options: ['The research is fraudulent', 'The topic is unimportant', 'The study needs improvement or clarification', 'The authors are unqualified'],
        correctIndex: 2,
        explanation: 'Rejection often indicates that a study requires clarification, stronger evidence, or improved methodology, not that it lacks value or integrity.'
      },
      {
        question: 'Which is a known limitation of peer review?',
        options: ['It completely eliminates bias', 'It guarantees correctness', 'Reviewers may disagree or miss errors', 'It prevents plagiarism entirely'],
        correctIndex: 2,
        explanation: 'Peer review improves reliability but cannot eliminate all errors or disagreements. Scientific evaluation remains a human process with limitations.'
      },
      {
        question: 'Which behavior violates peer review ethics?',
        options: ['Declaring a conflict of interest', 'Giving constructive criticism', 'Using unpublished data for personal research', 'Suggesting methodological improvements'],
        correctIndex: 2,
        explanation: 'Using confidential or unpublished information obtained through peer review for personal research violates ethical standards.'
      },
      {
        question: 'Why is peer review essential for scientific progress?',
        options: ['It promotes competition', 'It filters unreliable or weak research', 'It increases journal profits', 'It enforces consensus'],
        correctIndex: 1,
        explanation: 'Peer review filters out unreliable or weak studies, helping maintain the overall quality and credibility of scientific literature.'
      },
      {
        question: 'Which statement about post-publication review is correct?',
        options: ['Research cannot be challenged after publication', 'Published research may still be corrected or retracted', 'Peer review ends scientific discussion', 'Retractions always indicate misconduct'],
        correctIndex: 1,
        explanation: 'Scientific research remains open to correction after publication. Retractions or revisions may occur without implying misconduct.'
      },
      {
        question: 'A reviewer rejects a paper because it contradicts their own previous work. This is an example of:',
        options: ['Scientific rigor', 'Constructive criticism', 'Reviewer bias', 'Replication'],
        correctIndex: 2,
        explanation: 'Rejecting research because it challenges personal beliefs or prior work demonstrates bias, which undermines scientific objectivity.'
      },
      {
        question: 'What is a potential advantage of open peer review?',
        options: ['Guaranteed acceptance', 'Reviewer anonymity', 'Increased transparency and accountability', 'Faster rejection'],
        correctIndex: 2,
        explanation: 'Open peer review increases transparency and accountability by making reviewer identities or reports publicly available.'
      },
      {
        question: 'Which statement best reflects the scientific value of peer review?',
        options: ['"Well-reviewed science is always correct."', '"Science is judged by popularity."', '"Peer review improves reliability, not certainty."', '"Authority defines truth."'],
        correctIndex: 2,
        explanation: 'Peer review enhances reliability but does not guarantee correctness. Scientific knowledge evolves through continuous evaluation and evidence.'
      },
      {
        question: 'Which conclusion best aligns with scientific peer review principles?',
        options: ['New ideas should be rejected to protect existing theories', 'Peer review ensures science remains open to correction', 'Consensus is more important than evidence', 'Only famous scientists produce valid research'],
        correctIndex: 1,
        explanation: 'Scientific progress depends on openness to criticism, replication, and correction, not authority or consensus alone.'
      }
    ]
  },
  'scientific-communication': {
    title: 'Bilimsel İletişim',
    titleEn: 'Scientific Communication',
    concept: {
      native: `Bilimsel iletişim, araştırma bulgularının açık ve şeffaf bir şekilde paylaşılmasıdır.

Temel kavramlar:
• Hedef kitle farkındalığı
• Bilimsel vs popüler iletişim
• Görsel kullanımı
• Belirsizlik ve hata raporlama
• Etik sorumluluk
• Veri vs yorum ayrımı`,
      english: `Scientific communication is the clear and transparent sharing of research findings.

Key concepts:
• Audience awareness
• Scientific vs popular communication
• Use of visuals
• Uncertainty and error reporting
• Ethical responsibility
• Data vs interpretation distinction`
    },
    examples: [
      {
        problem: `Which of the following best describes the primary purpose of scientific communication?
A) To promote individual researchers
B) To persuade the public to accept conclusions
C) To share methods, data, and findings transparently
D) To simplify science for entertainment`,
        solution: 'C) To share methods, data, and findings transparently',
        explanation: `Scientific communication exists to clearly and transparently share methods, data, results, and interpretations so that research can be evaluated, replicated, and built upon.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Why must scientists consider their audience when communicating research?',
        options: ['To change scientific results', 'To hide uncertainty', 'To adapt language, depth, and format appropriately', 'To avoid criticism'],
        correctIndex: 2,
        explanation: 'Effective communication requires adapting terminology, structure, and level of detail to ensure understanding without compromising accuracy.'
      },
      {
        question: 'What is a key difference between scientific papers and popular science articles?',
        options: ['Popular articles include data; scientific papers do not', 'Scientific papers emphasize methods and evidence', 'Popular articles are peer-reviewed', 'Scientific papers avoid technical language'],
        correctIndex: 1,
        explanation: 'Scientific papers prioritize methodology, data, and evidence, while popular articles focus on accessibility and broader implications.'
      },
      {
        question: 'Why are visuals important in scientific communication?',
        options: ['They replace written explanations', 'They simplify complex data for clearer understanding', 'They are required by journals', 'They make papers longer'],
        correctIndex: 1,
        explanation: 'Visuals help convey complex information efficiently and can reveal patterns that are difficult to describe in text alone.'
      },
      {
        question: 'Which is an example of misleading scientific communication?',
        options: ['Reporting confidence intervals', 'Acknowledging limitations', 'Omitting negative results', 'Citing sources'],
        correctIndex: 2,
        explanation: 'Selectively reporting only positive results distorts the scientific record and misleads readers.'
      },
      {
        question: 'Why is it important to report uncertainty in scientific findings?',
        options: ['To confuse readers', 'To appear humble', 'To allow accurate interpretation and replication', 'To reduce publication chances'],
        correctIndex: 2,
        explanation: 'Reporting uncertainty ensures that findings are interpreted correctly and that future research can build on accurate information.'
      },
      {
        question: 'Which statement best describes reproducibility in science?',
        options: ['Results should be unique', 'Results should be replicable by independent researchers', 'Results should match expectations', 'Results should be simplified'],
        correctIndex: 1,
        explanation: 'Reproducibility is a cornerstone of science, allowing verification and trust in findings.'
      },
      {
        question: 'What is the ethical responsibility of a scientist when communicating findings?',
        options: ['To exaggerate significance', 'To hide limitations', 'To present data honestly and transparently', 'To avoid peer review'],
        correctIndex: 2,
        explanation: 'Scientists have an ethical duty to communicate findings honestly, including limitations and uncertainties.'
      },
      {
        question: 'Why should scientific language be precise?',
        options: ['To impress readers', 'To exclude non-experts', 'To ensure clarity and avoid misinterpretation', 'To increase word count'],
        correctIndex: 2,
        explanation: 'Precise language minimizes ambiguity and ensures that findings are understood correctly.'
      },
      {
        question: 'How should scientists respond to peer feedback?',
        options: ['Ignore criticism', 'Defend original conclusions without revision', 'Consider feedback and revise if warranted', 'Withdraw the paper'],
        correctIndex: 2,
        explanation: 'Constructive engagement with peer feedback strengthens research and scientific integrity.'
      },
      {
        question: 'Which is a risk of media misrepresentation of science?',
        options: ['Increased funding', 'Public misunderstanding of findings', 'Faster publication', 'More citations'],
        correctIndex: 1,
        explanation: 'Media oversimplification or sensationalism can lead to public misunderstanding of scientific findings.'
      },
      {
        question: 'What is the difference between data and interpretation?',
        options: ['They are identical', 'Data is objective; interpretation involves analysis and context', 'Interpretation is raw; data is analyzed', 'Data is opinion; interpretation is fact'],
        correctIndex: 1,
        explanation: 'Data are objective observations; interpretation involves analyzing data within context and theory.'
      },
      {
        question: 'Which principle best reflects responsible scientific communication?',
        options: ['Maximize impact by exaggerating findings', 'Avoid mentioning limitations', 'Ensure transparency, clarity, and accountability', 'Simplify to the point of inaccuracy'],
        correctIndex: 2,
        explanation: 'Scientific communication ensures openness, clarity, and accountability to both the scientific community and society.'
      }
    ]
  },
  'advanced-statistics': {
    title: 'İleri İstatistik',
    titleEn: 'Advanced Statistics',
    concept: {
      native: `İleri istatistik, karmaşık veri setlerini analiz etmek için kullanılan gelişmiş yöntemlerdir.

Temel kavramlar:
• Normal dağılım
• Z-skoru
• Korelasyon vs nedensellik
• Regresyon analizi
• Güven aralıkları
• Hipotez testi ve p-değeri`,
      english: `Advanced statistics encompasses sophisticated methods for analyzing complex datasets.

Key concepts:
• Normal distribution
• Z-score
• Correlation vs causation
• Regression analysis
• Confidence intervals
• Hypothesis testing and p-value`
    },
    examples: [
      {
        problem: `What does standard deviation measure?
A) Central tendency
B) Data spread or variability
C) Sample size
D) Correlation strength`,
        solution: 'B) Data spread or variability',
        explanation: `Standard deviation quantifies how much individual data points deviate from the mean.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which measure is most affected by outliers?',
        options: ['Median', 'Mode', 'Mean', 'Range'],
        correctIndex: 2,
        explanation: 'The mean is sensitive to extreme values, while the median is more robust.'
      },
      {
        question: 'In a normal distribution:',
        options: ['Mean > Median > Mode', 'Mean < Median < Mode', 'Mean = Median = Mode', 'Mean and Median are unrelated'],
        correctIndex: 2,
        explanation: 'A normal distribution is symmetric, with all three measures of central tendency equal.'
      },
      {
        question: 'A student scored 1.5 standard deviations above the mean on a test. What does this indicate?',
        options: ['The student scored below average', 'The student scored exactly at the mean', 'The student performed better than most peers', 'The score is invalid'],
        correctIndex: 2,
        explanation: 'A positive z-score indicates performance above the mean; higher values indicate stronger relative performance.'
      },
      {
        question: 'A strong positive correlation is observed between ice cream sales and drowning incidents. What is the most accurate conclusion?',
        options: ['Ice cream causes drowning', 'Drowning increases ice cream sales', 'A third variable influences both', 'Correlation implies causation'],
        correctIndex: 2,
        explanation: 'Correlation does not imply causation. In this case, temperature is a likely confounding variable.'
      },
      {
        question: 'In linear regression, the slope of the line represents:',
        options: ['Data dispersion', 'Strength of correlation', 'Rate of change between variables', 'Measurement error'],
        correctIndex: 2,
        explanation: 'The slope quantifies how much the dependent variable changes for each unit increase in the independent variable.'
      },
      {
        question: 'Which sampling method is most likely to produce biased results?',
        options: ['Random sampling', 'Stratified sampling', 'Voluntary response sampling', 'Systematic sampling'],
        correctIndex: 2,
        explanation: 'Voluntary response samples often attract participants with strong opinions, leading to bias.'
      },
      {
        question: 'A 95% confidence interval means:',
        options: ['95% of data points fall within the interval', 'The true parameter lies in the interval with 95% certainty', 'The sample mean is always correct', 'The experiment is error-free'],
        correctIndex: 1,
        explanation: 'A confidence interval reflects the probability that the interval contains the true population parameter.'
      },
      {
        question: 'Failing to reject a null hypothesis means:',
        options: ['The null hypothesis is proven true', 'The alternative hypothesis is false', 'There is insufficient evidence against the null hypothesis', 'The experiment failed'],
        correctIndex: 2,
        explanation: 'Statistical tests assess evidence, not absolute truth.'
      },
      {
        question: 'A p-value of 0.03 indicates:',
        options: ['The null hypothesis is true', 'The result is statistically significant at α = 0.05', 'There is a 3% chance the experiment failed', 'The data is normally distributed'],
        correctIndex: 1,
        explanation: 'A p-value below the significance level suggests strong evidence against the null hypothesis.'
      },
      {
        question: 'Which graph choice is most misleading?',
        options: ['Bar chart with equal scales', 'Histogram with labeled bins', 'Truncated y-axis exaggerating differences', 'Scatter plot with trend line'],
        correctIndex: 2,
        explanation: 'Truncated axes distort visual interpretation and exaggerate differences.'
      },
      {
        question: 'Why is multivariable analysis important?',
        options: ['It simplifies results', 'It removes uncertainty', 'It accounts for multiple influencing factors', 'It guarantees causation'],
        correctIndex: 2,
        explanation: 'Real-world phenomena are influenced by multiple variables that must be analyzed simultaneously.'
      },
      {
        question: 'Which statement best reflects responsible data interpretation?',
        options: ['Highlight only statistically significant results', 'Ignore outliers', 'Report assumptions, limitations, and uncertainty', 'Simplify to avoid confusion'],
        correctIndex: 2,
        explanation: 'Transparent reporting allows accurate interpretation and ethical use of data.'
      }
    ]
  },
  'big-data-concepts': {
    title: 'Büyük Veri Kavramları',
    titleEn: 'Big Data Concepts',
    concept: {
      native: `Büyük veri, geleneksel yöntemlerle işlenemeyecek kadar büyük ve karmaşık veri setlerini ifade eder.

Temel kavramlar:
• Hacim, hız, çeşitlilik (3V)
• Veri madenciliği
• Örüntü tanıma
• Makine öğrenimi
• Veri gizliliği
• Etik kullanım`,
      english: `Big data refers to datasets too large and complex to be processed by traditional methods.

Key concepts:
• Volume, velocity, variety (3Vs)
• Data mining
• Pattern recognition
• Machine learning
• Data privacy
• Ethical use`
    },
    examples: [
      {
        problem: `Which of the following best defines "Big Data"?
A) Data stored on large hard drives
B) Data that is too large, fast, or complex for traditional processing
C) Data collected only by governments
D) Data that is always accurate`,
        solution: 'B) Data that is too large, fast, or complex for traditional processing',
        explanation: `Big Data refers to datasets characterized by volume, velocity, and variety that require advanced tools for analysis.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which is NOT one of the "3 Vs" of Big Data?',
        options: ['Volume', 'Velocity', 'Validity', 'Variety'],
        correctIndex: 2,
        explanation: 'The classic 3 Vs are Volume, Velocity, and Variety. Validity is sometimes added but is not part of the original framework.'
      },
      {
        question: 'What is data mining?',
        options: ['Storing data underground', 'Extracting patterns from large datasets', 'Deleting old data', 'Encrypting data'],
        correctIndex: 1,
        explanation: 'Data mining involves discovering patterns, correlations, and insights from large datasets.'
      },
      {
        question: 'Why is Big Data important in healthcare?',
        options: ['It replaces doctors', 'It enables pattern detection for diagnosis and treatment', 'It eliminates medical errors', 'It reduces hospital size'],
        correctIndex: 1,
        explanation: 'Big Data analytics can identify disease patterns, predict outbreaks, and personalize treatment.'
      },
      {
        question: 'Which challenge is associated with Big Data?',
        options: ['Data is always clean', 'Privacy and security concerns', 'Data is easy to analyze', 'No storage is needed'],
        correctIndex: 1,
        explanation: 'Big Data raises significant privacy, security, and ethical concerns.'
      },
      {
        question: 'What role does machine learning play in Big Data?',
        options: ['It replaces all human analysis', 'It automates pattern recognition and prediction', 'It deletes unnecessary data', 'It slows down processing'],
        correctIndex: 1,
        explanation: 'Machine learning algorithms can process and learn from large datasets to make predictions.'
      },
      {
        question: 'Why is data quality important in Big Data analysis?',
        options: ['Quality does not matter', 'Poor quality leads to inaccurate conclusions', 'Quality only affects speed', 'Quality is automatically ensured'],
        correctIndex: 1,
        explanation: 'Garbage in, garbage out: poor data quality leads to unreliable results.'
      },
      {
        question: 'Which industry heavily relies on Big Data?',
        options: ['Only technology', 'Only healthcare', 'Only finance', 'All of the above'],
        correctIndex: 3,
        explanation: 'Big Data is used across industries including technology, healthcare, finance, retail, and more.'
      },
      {
        question: 'What is a potential ethical concern with Big Data?',
        options: ['Data is too accurate', 'Bias in algorithms and privacy violations', 'Data is too small', 'Analysis is too slow'],
        correctIndex: 1,
        explanation: 'Big Data can perpetuate bias and raise privacy concerns if not handled ethically.'
      },
      {
        question: 'How does Big Data differ from traditional data analysis?',
        options: ['Big Data is smaller', 'Big Data requires specialized tools and techniques', 'Traditional analysis is faster', 'There is no difference'],
        correctIndex: 1,
        explanation: 'Big Data requires distributed computing, advanced algorithms, and specialized infrastructure.'
      },
      {
        question: 'What is the role of visualization in Big Data?',
        options: ['It replaces analysis', 'It helps communicate patterns and insights', 'It is not needed', 'It only applies to small data'],
        correctIndex: 1,
        explanation: 'Visualization makes complex Big Data insights accessible and understandable.'
      },
      {
        question: 'Why is context important when interpreting Big Data results?',
        options: ['Context is irrelevant', 'Data speaks for itself', 'Context helps validate and apply findings appropriately', 'Context slows analysis'],
        correctIndex: 2,
        explanation: 'Without context, Big Data results can be misinterpreted or misapplied.'
      },
      {
        question: 'Which statement best reflects responsible Big Data use?',
        options: ['Collect as much data as possible without consent', 'Ignore data quality', 'Ensure privacy, transparency, and ethical analysis', 'Use data only for profit'],
        correctIndex: 2,
        explanation: 'Big Data insights require domain knowledge, validation, and ethical reasoning.'
      }
    ]
  },
  'predictive-analysis': {
    title: 'Tahmine Dayalı Analiz',
    titleEn: 'Predictive Analysis',
    concept: {
      native: `Tahmine dayalı analiz, geçmiş verileri kullanarak gelecekteki olayları tahmin etme yöntemidir.

Temel kavramlar:
• Geçmiş verilerden öğrenme
• Model oluşturma
• Tahmin doğruluğu
• Aşırı uyum (overfitting)
• Etik kullanım
• İnsan denetimi`,
      english: `Predictive analysis uses historical data to forecast future events.

Key concepts:
• Learning from historical data
• Model building
• Prediction accuracy
• Overfitting
• Ethical use
• Human oversight`
    },
    examples: [
      {
        problem: `What is the primary goal of predictive analysis?
A) To describe past events
B) To forecast future outcomes based on data
C) To delete old data
D) To replace human judgment`,
        solution: 'B) To forecast future outcomes based on data',
        explanation: `Predictive analysis uses historical data and statistical models to make informed predictions about future events.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Which of the following is an example of predictive analysis?',
        options: ['Summarizing last year\'s sales', 'Forecasting next quarter\'s revenue', 'Counting website visitors', 'Listing customer names'],
        correctIndex: 1,
        explanation: 'Predictive analysis focuses on forecasting future outcomes, not just describing past data.'
      },
      {
        question: 'What is overfitting in predictive modeling?',
        options: ['The model is too simple', 'The model fits training data too closely and fails on new data', 'The model ignores all data', 'The model is always accurate'],
        correctIndex: 1,
        explanation: 'Overfitting occurs when a model captures noise rather than underlying patterns, reducing generalizability.'
      },
      {
        question: 'Why is historical data important for predictive analysis?',
        options: ['It is not important', 'It provides patterns for forecasting', 'It replaces future data', 'It guarantees accuracy'],
        correctIndex: 1,
        explanation: 'Historical data reveals patterns and trends that inform predictions.'
      },
      {
        question: 'Which factor can reduce the accuracy of predictive models?',
        options: ['High-quality data', 'Large sample size', 'Biased or incomplete data', 'Proper validation'],
        correctIndex: 2,
        explanation: 'Biased or incomplete data leads to inaccurate predictions.'
      },
      {
        question: 'What is the role of validation in predictive analysis?',
        options: ['To skip testing', 'To ensure the model performs well on new data', 'To increase model complexity', 'To ignore errors'],
        correctIndex: 1,
        explanation: 'Validation tests whether a model generalizes beyond the training data.'
      },
      {
        question: 'Which industry uses predictive analysis for fraud detection?',
        options: ['Only retail', 'Only healthcare', 'Finance and banking', 'None'],
        correctIndex: 2,
        explanation: 'Financial institutions use predictive models to detect unusual patterns indicative of fraud.'
      },
      {
        question: 'What is a limitation of predictive analysis?',
        options: ['It is always accurate', 'It cannot account for unprecedented events', 'It replaces all human decisions', 'It requires no data'],
        correctIndex: 1,
        explanation: 'Predictive models rely on historical patterns and may fail when faced with novel situations.'
      },
      {
        question: 'Why is feature selection important in predictive modeling?',
        options: ['It increases model complexity', 'It identifies the most relevant variables for prediction', 'It removes all data', 'It guarantees accuracy'],
        correctIndex: 1,
        explanation: 'Selecting relevant features improves model performance and interpretability.'
      },
      {
        question: 'How can predictive analysis be used in education?',
        options: ['To replace teachers', 'To predict student dropout risk', 'To eliminate exams', 'To increase class size'],
        correctIndex: 1,
        explanation: 'Predictive models can identify at-risk students for early intervention.'
      },
      {
        question: 'What ethical concern arises from predictive analysis?',
        options: ['Models are always fair', 'Predictions can reinforce bias', 'Data is always accurate', 'No ethical concerns exist'],
        correctIndex: 1,
        explanation: 'Predictive models can perpetuate or amplify existing biases in data.'
      },
      {
        question: 'Why is human oversight important in predictive analysis?',
        options: ['Humans slow down analysis', 'Humans can contextualize and validate predictions', 'Humans are not needed', 'Humans introduce errors'],
        correctIndex: 1,
        explanation: 'Human reasoning ensures predictions are applied responsibly and appropriately.'
      },
      {
        question: 'Which statement best reflects responsible use of predictive analysis?',
        options: ['Trust all predictions without question', 'Ignore model limitations', 'Validate, contextualize, and apply ethically', 'Use only for profit'],
        correctIndex: 2,
        explanation: 'Responsible use requires validation, context, and ethical consideration.'
      }
    ]
  },
  'complex-reasoning': {
    title: 'Karmaşık Akıl Yürütme',
    titleEn: 'Complex Reasoning',
    concept: {
      native: `Karmaşık akıl yürütme, çok yönlü problemleri analiz etme ve değerlendirme yeteneğidir.

Temel kavramlar:
• Argüman analizi
• Varsayım belirleme
• Kanıt değerlendirme
• Mantıksal hatalar
• Çıkarım türleri
• Eleştirel değerlendirme`,
      english: `Complex reasoning is the ability to analyze and evaluate multifaceted problems.

Key concepts:
• Argument analysis
• Assumption identification
• Evidence evaluation
• Logical fallacies
• Types of inference
• Critical evaluation`
    },
    examples: [
      {
        problem: `Which skill is most essential for complex reasoning?
A) Memorizing facts
B) Analyzing assumptions and evidence
C) Following instructions without question
D) Avoiding difficult questions`,
        solution: 'B) Analyzing assumptions and evidence',
        explanation: `Complex reasoning requires examining underlying assumptions, evaluating evidence, and drawing logical conclusions.`
      }
    ],
    practiceQuestions: [
      {
        question: 'What is an assumption in an argument?',
        options: ['A stated fact', 'An unstated belief taken for granted', 'A conclusion', 'A piece of evidence'],
        correctIndex: 1,
        explanation: 'Assumptions are implicit beliefs that support an argument but are not explicitly stated.'
      },
      {
        question: 'Which is an example of a logical fallacy?',
        options: ['Using evidence to support a claim', 'Attacking the person instead of the argument', 'Acknowledging limitations', 'Considering multiple perspectives'],
        correctIndex: 1,
        explanation: 'Ad hominem attacks target the person rather than addressing the argument itself.'
      },
      {
        question: 'Why is it important to identify assumptions?',
        options: ['Assumptions are always correct', 'Hidden assumptions can weaken an argument', 'Assumptions are irrelevant', 'Assumptions replace evidence'],
        correctIndex: 1,
        explanation: 'Unexamined assumptions can undermine the validity of an argument.'
      },
      {
        question: 'What distinguishes strong evidence from weak evidence?',
        options: ['Strong evidence is always recent', 'Strong evidence is relevant, reliable, and sufficient', 'Weak evidence is always false', 'Evidence quality does not matter'],
        correctIndex: 1,
        explanation: 'Strong evidence is relevant to the claim, comes from reliable sources, and is sufficient to support the conclusion.'
      },
      {
        question: 'Which type of reasoning moves from general principles to specific conclusions?',
        options: ['Inductive reasoning', 'Deductive reasoning', 'Abductive reasoning', 'Analogical reasoning'],
        correctIndex: 1,
        explanation: 'Deductive reasoning applies general rules to reach specific conclusions.'
      },
      {
        question: 'What is the purpose of considering counterarguments?',
        options: ['To weaken your own position', 'To strengthen reasoning by addressing objections', 'To avoid making a decision', 'To confuse the audience'],
        correctIndex: 1,
        explanation: 'Engaging with counterarguments demonstrates thorough reasoning and strengthens the overall argument.'
      },
      {
        question: 'Which statement reflects critical thinking?',
        options: ['"I accept this because an expert said it."', '"I will examine the evidence before concluding."', '"My intuition is always correct."', '"Popular opinions are always right."'],
        correctIndex: 1,
        explanation: 'Critical thinking involves evaluating evidence rather than accepting claims uncritically.'
      },
      {
        question: 'What is a hasty generalization?',
        options: ['A conclusion based on sufficient evidence', 'A conclusion drawn from too few examples', 'A well-supported argument', 'A logical deduction'],
        correctIndex: 1,
        explanation: 'Hasty generalizations draw broad conclusions from insufficient or unrepresentative samples.'
      },
      {
        question: 'Why is context important in complex reasoning?',
        options: ['Context is irrelevant', 'Context helps interpret evidence and arguments accurately', 'Context complicates reasoning', 'Context should be ignored'],
        correctIndex: 1,
        explanation: 'Context provides the background needed to interpret evidence and arguments correctly.'
      },
      {
        question: 'Which approach best supports complex reasoning?',
        options: ['Accepting the first answer', 'Examining multiple perspectives and evidence', 'Avoiding difficult questions', 'Relying on intuition alone'],
        correctIndex: 1,
        explanation: 'Complex reasoning requires considering multiple viewpoints and evaluating evidence systematically.'
      },
      {
        question: 'What is the difference between correlation and causation?',
        options: ['They are identical', 'Correlation implies causation', 'Causation requires evidence beyond correlation', 'Causation is weaker than correlation'],
        correctIndex: 2,
        explanation: 'Establishing causation requires controlled experiments or additional evidence beyond observed correlation.'
      },
      {
        question: 'Which statement best reflects advanced critical thinking?',
        options: ['"I trust my first impression."', '"I examine assumptions, evidence, and implications."', '"I avoid challenging questions."', '"I accept authority without question."'],
        correctIndex: 1,
        explanation: 'Advanced critical thinking evaluates not only outcomes but also the reasoning process itself.'
      }
    ]
  },
  'synthesis': {
    title: 'Sentez',
    titleEn: 'Synthesis',
    concept: {
      native: `Sentez, farklı kaynaklardan gelen bilgileri birleştirerek yeni anlayışlar oluşturma sürecidir.

Temel kavramlar:
• Bilgi entegrasyonu
• Çoklu kaynak analizi
• Tutarlılık değerlendirmesi
• Yeni çerçeve oluşturma
• Disiplinler arası düşünme
• Yaratıcı problem çözme`,
      english: `Synthesis is the process of combining information from different sources to create new understanding.

Key concepts:
• Information integration
• Multi-source analysis
• Consistency evaluation
• Framework creation
• Interdisciplinary thinking
• Creative problem solving`
    },
    examples: [
      {
        problem: `What does synthesis in critical thinking involve?
A) Repeating information from a single source
B) Combining information from multiple sources to form new understanding
C) Ignoring conflicting evidence
D) Accepting all claims equally`,
        solution: 'B) Combining information from multiple sources to form new understanding',
        explanation: `Synthesis involves integrating diverse information to create coherent, original insights.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Why is synthesis important in research?',
        options: ['It simplifies by ignoring sources', 'It integrates findings to build comprehensive understanding', 'It replaces analysis', 'It avoids complexity'],
        correctIndex: 1,
        explanation: 'Synthesis combines diverse findings to create a more complete picture.'
      },
      {
        question: 'What is the first step in synthesizing information?',
        options: ['Drawing conclusions immediately', 'Gathering and understanding multiple sources', 'Ignoring conflicting data', 'Choosing the easiest source'],
        correctIndex: 1,
        explanation: 'Effective synthesis begins with thoroughly understanding the sources being combined.'
      },
      {
        question: 'How should conflicting sources be handled in synthesis?',
        options: ['Ignore conflicts', 'Choose the most popular source', 'Analyze and reconcile differences', 'Discard all sources'],
        correctIndex: 2,
        explanation: 'Synthesis requires examining why sources conflict and how differences can be reconciled or explained.'
      },
      {
        question: 'What distinguishes synthesis from summarization?',
        options: ['They are identical', 'Synthesis creates new insights; summarization restates existing information', 'Summarization is more complex', 'Synthesis ignores sources'],
        correctIndex: 1,
        explanation: 'Synthesis goes beyond restating information to create new understanding.'
      },
      {
        question: 'Why is interdisciplinary thinking valuable in synthesis?',
        options: ['It complicates analysis', 'It brings diverse perspectives to complex problems', 'It is unnecessary', 'It replaces expertise'],
        correctIndex: 1,
        explanation: 'Interdisciplinary approaches enrich synthesis by incorporating multiple viewpoints.'
      },
      {
        question: 'What is a key challenge in synthesis?',
        options: ['Having too few sources', 'Integrating diverse and sometimes conflicting information', 'Avoiding all complexity', 'Ignoring context'],
        correctIndex: 1,
        explanation: 'Synthesis requires skillfully integrating diverse, sometimes contradictory, information.'
      },
      {
        question: 'How does synthesis support decision-making?',
        options: ['By simplifying to one perspective', 'By integrating multiple factors for informed choices', 'By avoiding analysis', 'By relying on intuition'],
        correctIndex: 1,
        explanation: 'Synthesis provides a comprehensive foundation for informed decisions.'
      },
      {
        question: 'What role does creativity play in synthesis?',
        options: ['Creativity is irrelevant', 'Creativity helps generate new frameworks and insights', 'Creativity replaces evidence', 'Creativity complicates synthesis'],
        correctIndex: 1,
        explanation: 'Creative thinking enables novel connections and frameworks in synthesis.'
      },
      {
        question: 'Why is it important to evaluate the quality of sources before synthesis?',
        options: ['Quality does not matter', 'Poor sources lead to unreliable synthesis', 'All sources are equal', 'Evaluation slows synthesis'],
        correctIndex: 1,
        explanation: 'Reliable synthesis depends on the quality and credibility of the sources used.'
      },
      {
        question: 'What is an example of synthesis in real-world problem solving?',
        options: ['Copying a single solution', 'Combining insights from science, ethics, and policy to address climate change', 'Ignoring complexity', 'Avoiding multiple perspectives'],
        correctIndex: 1,
        explanation: 'Real-world problems often require synthesizing knowledge from multiple domains.'
      },
      {
        question: 'How should ethical considerations be integrated into synthesis?',
        options: ['Ethics are irrelevant', 'Ethics should be balanced with practical and scientific factors', 'Ethics replace evidence', 'Ethics complicate synthesis'],
        correctIndex: 1,
        explanation: 'Ethical considerations are an essential part of comprehensive synthesis.'
      },
      {
        question: 'Which statement best reflects advanced synthesis?',
        options: ['"I combine sources without analysis."', '"I create a coherent, justified framework from multiple sources."', '"I ignore conflicting evidence."', '"I rely on a single perspective."'],
        correctIndex: 1,
        explanation: 'Advanced synthesis produces a structured, original framework grounded in multiple sources.'
      }
    ]
  },
  'metacognition': {
    title: 'Üstbiliş',
    titleEn: 'Metacognition',
    concept: {
      native: `Üstbiliş, kendi düşünme süreçlerinin farkında olma ve bunları düzenleme yeteneğidir.

Temel kavramlar:
• Öz-farkındalık
• Öz-değerlendirme
• Strateji seçimi
• Öğrenme düzenleme
• Hata tanıma
• Sürekli iyileştirme`,
      english: `Metacognition is the awareness and regulation of one's own thinking processes.

Key concepts:
• Self-awareness
• Self-evaluation
• Strategy selection
• Learning regulation
• Error recognition
• Continuous improvement`
    },
    examples: [
      {
        problem: `What is metacognition?
A) Memorizing facts
B) Thinking about one's own thinking
C) Avoiding self-reflection
D) Following instructions without question`,
        solution: 'B) Thinking about one\'s own thinking',
        explanation: `Metacognition involves awareness and regulation of one's own cognitive processes.`
      }
    ],
    practiceQuestions: [
      {
        question: 'Why is metacognition important for learning?',
        options: ['It replaces studying', 'It helps learners monitor and improve their understanding', 'It is unnecessary', 'It complicates learning'],
        correctIndex: 1,
        explanation: 'Metacognition enables learners to assess their understanding and adjust strategies.'
      },
      {
        question: 'Which is an example of metacognitive awareness?',
        options: ['Memorizing without understanding', 'Recognizing when you do not understand a concept', 'Avoiding difficult topics', 'Accepting all information uncritically'],
        correctIndex: 1,
        explanation: 'Metacognitive awareness includes recognizing gaps in understanding.'
      },
      {
        question: 'What is self-regulation in metacognition?',
        options: ['Avoiding all challenges', 'Adjusting strategies based on self-assessment', 'Ignoring feedback', 'Relying only on others'],
        correctIndex: 1,
        explanation: 'Self-regulation involves adapting learning strategies based on ongoing evaluation.'
      },
      {
        question: 'How does metacognition support problem solving?',
        options: ['By avoiding reflection', 'By enabling evaluation of strategies and progress', 'By relying on intuition alone', 'By ignoring errors'],
        correctIndex: 1,
        explanation: 'Metacognition helps problem solvers monitor their approach and adjust as needed.'
      },
      {
        question: 'What is the role of reflection in metacognition?',
        options: ['Reflection is unnecessary', 'Reflection helps identify strengths and weaknesses', 'Reflection slows learning', 'Reflection replaces practice'],
        correctIndex: 1,
        explanation: 'Reflection is central to metacognition, enabling continuous improvement.'
      },
      {
        question: 'Which question reflects metacognitive thinking?',
        options: ['"What is the answer?"', '"Do I understand this well enough to explain it?"', '"Who can give me the answer?"', '"Is this topic popular?"'],
        correctIndex: 1,
        explanation: 'Metacognitive questions focus on self-assessment of understanding.'
      },
      {
        question: 'Why is it important to recognize errors in thinking?',
        options: ['Errors are irrelevant', 'Recognizing errors enables correction and growth', 'Errors should be hidden', 'Errors indicate failure'],
        correctIndex: 1,
        explanation: 'Error recognition is essential for learning and improvement.'
      },
      {
        question: 'How can metacognition improve test performance?',
        options: ['By avoiding preparation', 'By helping students identify weak areas and adjust study strategies', 'By relying on luck', 'By ignoring feedback'],
        correctIndex: 1,
        explanation: 'Metacognition enables targeted preparation and effective study strategies.'
      },
      {
        question: 'What is the relationship between metacognition and critical thinking?',
        options: ['They are unrelated', 'Metacognition supports critical thinking by enabling self-evaluation', 'Critical thinking replaces metacognition', 'Metacognition is less important'],
        correctIndex: 1,
        explanation: 'Metacognition enhances critical thinking by promoting self-awareness and evaluation.'
      },
      {
        question: 'Which strategy supports metacognitive development?',
        options: ['Avoiding challenges', 'Regularly reflecting on learning and adjusting strategies', 'Ignoring mistakes', 'Relying only on memorization'],
        correctIndex: 1,
        explanation: 'Regular reflection and strategy adjustment are key to metacognitive growth.'
      },
      {
        question: 'Why is metacognition valuable beyond academics?',
        options: ['It is only useful in school', 'It supports lifelong learning and adaptability', 'It has no real-world application', 'It complicates decision-making'],
        correctIndex: 1,
        explanation: 'Metacognition enables independent learning and adaptation in all areas of life.'
      },
      {
        question: 'Which statement best reflects advanced metacognition?',
        options: ['"I never question my understanding."', '"I continuously evaluate and adapt my thinking."', '"I avoid self-reflection."', '"I rely only on external feedback."'],
        correctIndex: 1,
        explanation: 'Metacognition empowers learners to adapt in changing environments.'
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
