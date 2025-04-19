import { Component, OnInit,Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, NgFor, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../home/navbar/navbar.component';
import { ViewportScroller } from '@angular/common';
import {FooterComponent} from '../footer/footer.component'; // Importez ViewportScroller

@Component({
  selector: 'app-prestation',
  standalone: true,
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css'],
  imports: [CommonModule, NgFor, NavbarComponent, FooterComponent]
})
export class PrestationComponent implements OnInit { // Implémentez OnInit
  services = [
    {
      title: "Coupe",
      image: "assets/images/prestation/femme/coupe.jpg",
      description: "Une coupe adaptée à votre style et votre morphologie.",
      details: {
        femme: [
          {
            text: "Coupe sur-mesure pour sublimer votre visage et votre style.",
            image: "assets/images/prestation/femme/coupe1.jpg"
          },
          {
            text: "Des longueurs maîtrisées, une forme parfaite.",
            image: "assets/images/prestation/femme/coupe2.jpg"
          },
          {
            text: "Transformation capillaire ? On s’en occupe.",
            image: "assets/images/prestation/femme/coupe3.jpg"
          },
          {
            text: "Carré, dégradé, effilé… la coupe qu’il vous faut.",
            image: "assets/images/prestation/femme/coupe4.jpg"
          },
          {
            text: "Un coup de ciseaux, un boost de confiance.",
            image: "assets/images/prestation/femme/coupe5.jpg"
          },
        ],
        homme: [
          {
            text: "Coupe précise et personnalisée, pour un style qui vous ressemble.",
            image: "assets/images/prestation/homme/coupe.jpg"
          },
          {
            text: "Dégradé propre, contours nets – la base d’un look impeccable.",
            image: "assets/images/prestation/homme/coupe1.jpg"
          },
          {
            text: "Un savoir-faire pro pour une coupe qui dure.",
            image: "assets/images/prestation/homme/coupe2.jpg"
          },
          {
            text: "Style classique ou tendance, à vous de choisir.",
            image: "assets/images/prestation/homme/coupe3.jpg"
          },
          {
            text: "Coupe + taille de barbe : le combo gagnant.",
            image: "assets/images/prestation/homme/coupe4.jpg"
          },
        ],
        enfant: [
          // Garçon
          {
            text: "Coupe stylée pour les petits gars pleins d’énergie.",
            image: "assets/images/prestation/enfant/coupe1home.jpg"
          },
          {
            text: "Dégradé, coupe courte ou classique : tout est possible.",
            image: "assets/images/prestation/enfant/coupe2.jpg"
          },
          {
            text: "Un style cool et facile à entretenir.",
            image: "assets/images/prestation/enfant/coupe3.jpg"
          },
          // Fille
          {
            text: "Coupe mignonne et pratique pour petites fashionistas.",
            image: "assets/images/prestation/enfant/coupef1.jpg"
          },
          {
            text: "Touche fraîcheur pour une chevelure facile à coiffer.",
            image: "assets/images/prestation/enfant/coupef2.jpg"
          },
          {
            text: "Une coupe douce, rapide et adaptée à son âge.",
            image: "assets/images/prestation/enfant/coupef4.jpg"
          },
        ]
      }
    },
    {
      title: "Coiffure",
      image: "assets/images/prestation/femme/coiffure.jpg",
      description: "Une coupe adaptée à votre style et votre morphologie.",
      details: {
        femme: [
          {
            text: "Coiffure élégante et personnalisée.",
            image: "assets/images/prestation/femme/coiffure1.jpg"
          },
          {
            text: "Coiffure sur mesure, pour révéler votre style.",
            image: "assets/images/prestation/femme/coiffure2.jpg"
          },
          {
            text: "Chignons, tresses ou wavy – la coiffure idéale pour chaque occasion.",
            image: "assets/images/prestation/femme/coiffure3.jpg"
          },
          {
            text: "Look naturel ou sophistiqué, à vous de choisir.",
            image: "assets/images/prestation/femme/coiffure4.jpg"
          },
          {
            text: "Brushing soyeux et volume glamour.",
            image: "assets/images/prestation/femme/coiffure6.jpg"
          },
        ],
        homme: [
          {
            text: "Style soigné pour toutes occasions.",
            image: "assets/images/prestation/homme/coupe1.jpg"
          },
          {
            text: "Dégradé fondu précis, au millimètre près",
            image: "assets/images/prestation/homme/coiffure1.jpg"
          },
          {
            text: "Look classique ou moderne, adapté à chaque visage.",
            image: "assets/images/prestation/homme/coiffure2.jpg"
          },
          {
            text: "Barbe taillée avec soin pour une finition parfaite.",
            image: "assets/images/prestation/homme/coiffure3.jpg"
          },
          {
            text: "Un service coiffure sur mesure, pour des hommes stylés.",
            image: "assets/images/prestation/homme/coiffure5.png"
          },
        ],
        enfant: [
          {
            text: "Coiffure enfant adaptée et tendance.",
            image: "assets/images/prestation/enfant/coiffure1.jpg"
          },
          {
            text: "Tresses, chignons ou couettes – des coiffures adorables et pratiques.",
            image: "assets/images/prestation/enfant/coiffuref2.jpg"
          },
          {
            text: "Coupe dynamique pour les petits aventuriers.",
            image: "assets/images/prestation/enfant/coiffure2.jpg"
          },
          {
            text: "Style cool et facile à vivre, pour tous les jours.",
            image: "assets/images/prestation/enfant/coiffure3.jpg"
          },
          {
            text: "Coiffure douce et fun pour petites princesses.",
            image: "assets/images/prestation/enfant/coiffuref2.jpg"
          },
          {
            text: "Look mignon et soigné, parfait pour l’école ou les fêtes.\n" +
              "\n",
            image: "assets/images/prestation/enfant/coiffuref3.jpg"
          },
        ]
      }
    },
    {
      title: "Soin",
      image: "assets/images/prestation/femme/soin.jpg",
      description: "Des soins capillaires nourrissants et réparateurs.",
      details: {
        femme: [
          {
            text: "Soin du visage éclat pour une peau lumineuse et reposée.",
            image: "assets/images/prestation/femme/soin1.jpg"
          },
          {
            text: "Hydratation intense, douceur garantie.",
            image: "assets/images/prestation/femme/soin2.jpg"
          },
          {
            text: "Moment cocooning avec notre soin relaxant sur-mesure.",
            image: "assets/images/prestation/femme/soin3.jpg"
          },
        ],
        homme: [
          {
            text: "Traitement revitalisant pour cheveux masculins.",
            image: "assets/images/prestation/homme/soin.jpg"
          },
          {
            text: "Soin complet homme : peau revitalisée, traits reposés.",
            image: "assets/images/prestation/homme/soin1.jpg"
          },
          {
            text: "Soin visage purifiant pour une peau nette et fraîche",
            image: "assets/images/prestation/homme/soin2.jpg"
          },
          {
            text: "Une pause bien-être pensée pour l'homme moderne.",
            image: "assets/images/prestation/homme/soin3.jpg"
          },
          {
            text: "Massage crânien et détente express, rien que pour lui.",
            image: "assets/images/prestation/homme/soin5.jpg"
          },
        ]
      }
    },
    {
      title: "Perruques",
      image: "assets/images/prestation/femme/perruque.jpg",
      description: "Large choix de perruques naturelles et synthétiques.",
      details: {
        femme: [
          {
            text: "Style long, naturel et élégant.",
            image: "assets/images/prestation/femme/perruque1.jpg"
          },
          {
            text: "Volume maîtrisé et longueur glamour, à porter en toute confiance.",
            image: "assets/images/prestation/femme/perruque2.jpg"
          },
          {
            text: "Modèle court, facile à entretenir.",
            image: "assets/images/prestation/femme/perruque3.jpg"
          },
          {
            text: "Perruque longue effet naturel, parfaite pour une allure raffinée sans effort.",
            image: "assets/images/prestation/femme/perruque4.jpg"
          },
          {
            text: "Style naturel et lumineux, pour révéler votre beauté avec subtilité",
            image: "assets/images/prestation/femme/perruque6.jpg"
          },
          {
            text: "Modèle court, facile à entretenir.",
            image: "assets/images/prestation/femme/peruque6.jpg"
          }
        ],
      }
    },
    {
      title: "Lissage",
      image: "assets/images/prestation/femme/lissage.jpg",
      description: "Un lissage professionnel pour des cheveux soyeux.",
      details: {
        femme: [
          {
            text: "Lissage brésilien pour une chevelure lisse et brillante.",
            image: "assets/images/prestation/femme/lissage.jpg"
          },
          {
            text: "Lissage au tanin pour un résultat naturel et une douceur incomparable.",
            image: "assets/images/prestation/femme/lise1.jpg"
          },
          {
            text: "Cheveux parfaitement disciplinés grâce au lissage japonais, idéal pour un effet raide longue durée.",
            image: "assets/images/prestation/femme/lise2.jpg"
          },
          {
            text: "Lissage français : une solution douce pour des cheveux brillants, souples et faciles à coiffer.",
            image: "assets/images/prestation/femme/lise3.jpg"
          },
          {
            text: "Soin lissant à la kératine pour une chevelure nourrie en profondeur et sans frisottis.",
            image: "assets/images/prestation/femme/lise4.jpg"
          }
        ]
      }
    }
  ];


  tarifs = {
    dames: [
      { title: "Shampooing et Coiffage", price: "25€" },
      { title: "Shampooing, coupe brushing", price: "40€" },
      { title: "Shamp, coupe, brushing, soin / courts", price: "50€" }
    ],
    hommes: [
      { title: "Shampooing et Coupe", price: "20€" },
      { title: "Coupe simple", price: "15€" }
    ],
    enfants: [
      { title: "Coupe enfant -10 ans", price: "15€" },
      { title: "Coupe ado (10-16 ans)", price: "18€" }
    ]
  };

  categories: Array<'dames' | 'hommes' | 'enfants'> = ['dames', 'hommes', 'enfants'];
  selectedService: any = this.services[0];
  isBrowser: boolean = false;

  // Injectez ViewportScroller dans le constructeur
  constructor(
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Implémentez ngOnInit pour déclencher le défilement vers le haut
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  selectService(service: any) {
    this.selectedService = service;
    //this.viewportScroller.scrollToPosition([0, 0]); // Défile vers le haut après la sélection
  }
}
