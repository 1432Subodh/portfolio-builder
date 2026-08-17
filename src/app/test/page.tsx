"use client";

import React from "react";
import { motion } from "framer-motion";

function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background overflow-hidden">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1200"
        width="400"
        height="400"
        fill="none"
        className="logo-animate"
        initial="hidden"
        animate="visible"
      >
        <defs>
          {/* ================================
              MAIN GRADIENT
          ================================= */}
          <linearGradient
            id="green-main"
            x1="180"
            y1="180"
            x2="1040"
            y2="930"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#005332" />
            <stop offset="0.28" stopColor="#007B4D" />
            <stop offset="0.55" stopColor="#00B87A" />
            <stop offset="0.76" stopColor="#4BE6AF" />
            <stop offset="1" stopColor="#007247" />
          </linearGradient>

          {/* ================================
              DARK INNER
          ================================= */}
          <linearGradient
            id="green-dark"
            x1="920"
            y1="330"
            x2="500"
            y2="900"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#002F20" />
            <stop offset="0.38" stopColor="#004A31" />
            <stop offset="0.7" stopColor="#00683F" />
            <stop offset="1" stopColor="#008B5A" />
          </linearGradient>

          {/* ================================
              STEM
          ================================= */}
          <linearGradient
            id="green-stem"
            x1="170"
            y1="670"
            x2="490"
            y2="1120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#58E9B5" />
            <stop offset="0.32" stopColor="#13C48A" />
            <stop offset="0.7" stopColor="#008E5D" />
            <stop offset="1" stopColor="#005333" />
          </linearGradient>

          {/* ================================
              HIGHLIGHT
          ================================= */}
          <linearGradient
            id="green-highlight"
            x1="220"
            y1="145"
            x2="1000"
            y2="440"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00A878" stopOpacity="0" />
            <stop offset="0.45" stopColor="#00D294" stopOpacity="0.12" />
            <stop offset="0.8" stopColor="#A2FFD9" stopOpacity="0.3" />
            <stop offset="1" stopColor="#B8FFE3" stopOpacity="0" />
          </linearGradient>

          {/* ================================
              SPARK
          ================================= */}
          <linearGradient
            id="spark-green"
            x1="1010"
            y1="70"
            x2="1160"
            y2="270"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00633E" />
            <stop offset="0.5" stopColor="#00A878" />
            <stop offset="1" stopColor="#55EABB" />
          </linearGradient>

          {/* ================================
              GLOW
          ================================= */}
          <filter
            id="glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>

          {/* ================================
              SHINE GRADIENT
          ================================= */}
          <linearGradient
            id="shine-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.45" stopColor="white" stopOpacity="0" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.45" />
            <stop offset="0.55" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <clipPath id="logo-clip">
            <path
              d="
                M205 138
                H690
                C786 138 868 157 938 208
                C1009 260 1054 336 1072 424
                C1092 523 1065 622 1002 702
                C939 781 850 831 748 840
                H608
                C557 840 518 862 494 900
                C481 920 475 945 475 973
                V1080
                L370 1142
                L201 1044
                V785
                L365 685
                V580
                C365 526 393 491 438 480
                C469 473 500 481 529 500
                L750 646
                C786 621 808 581 812 538
                C816 491 802 453 770 426
                C739 399 699 384 649 384
                H341
                C270 384 211 359 172 322
                C140 292 125 249 136 207
                C145 166 169 142 205 138
                Z
              "
            />
          </clipPath>
        </defs>

        {/* =================================================
            MAIN MARK
        ================================================== */}

        <motion.g
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.88,
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          style={{
            transformOrigin: "600px 600px",
          }}
        >
          {/* ================================
              BACK GLOW
          ================================= */}

          <motion.path
            d="
              M205 140
              H690
              C790 140 875 160 945 215
              C1018 272 1062 352 1076 440
              C1093 546 1055 648 986 725
              C920 800 840 842 748 847
              H606
              C552 847 515 870 492 906
              C480 925 474 948 474 977
              V1080
              L370 1142
              L200 1044
              V785
              L365 685
              V580
              C365 525 395 485 440 478
              C470 473 500 482 528 500
              L750 645
              C786 620 808 582 812 537
              C816 489 802 452 770 425
              C740 399 700 385 650 385
              H340
              C265 385 205 358 169 320
              C137 286 126 243 136 204
              C145 165 169 144 205 140
              Z
            "
            fill="#00B77A"
            opacity={0.13}
            filter="url(#glow)"
            animate={{
              opacity: [0.08, 0.16, 0.08],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "600px 600px",
            }}
          />

          {/* ================================
              OUTER LOGO
          ================================= */}

          <motion.path
            id="logo-main"
            d="
              M205 138
              H690
              C786 138 868 157 938 208
              C1009 260 1054 336 1072 424
              C1092 523 1065 622 1002 702
              C939 781 850 831 748 840
              H608
              C557 840 518 862 494 900
              C481 920 475 945 475 973
              V1080
              L370 1142
              L201 1044
              V785
              L365 685
              V580
              C365 526 393 491 438 480
              C469 473 500 481 529 500
              L750 646
              C786 621 808 581 812 538
              C816 491 802 453 770 426
              C739 399 699 384 649 384
              H341
              C270 384 211 359 172 322
              C140 292 125 249 136 207
              C145 166 169 142 205 138
              Z
            "
            fill="url(#green-main)"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* ================================
              INNER P
          ================================= */}

          <motion.path
            id="logo-inner"
            d="
              M529 500
              L750 646
              C786 621 808 581 812 538
              C816 491 802 453 770 426
              C739 399 699 384 649 384
              H341
              C270 384 211 359 172 322
              C211 347 266 359 331 359
              H642
              C697 359 741 374 774 403
              C811 436 828 479 825 528
              C822 578 798 621 760 650
              L742 663
              L529 522
              C511 510 510 501 529 500
              Z
            "
            fill="url(#green-dark)"
            initial={{
              opacity: 0,
              x: -24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* ================================
              DIAGONAL
          ================================= */}

          <motion.path
            id="logo-diagonal"
            d="
              M365 618
              L438 576
              C459 564 480 554 499 548
              L750 704
              C725 742 686 772 641 794
              C613 807 584 816 553 823
              C510 832 478 853 456 883
              C444 900 437 919 434 941
              V1080
              L365 1119
              V618
              Z
            "
            fill="url(#green-main)"
            initial={{
              opacity: 0,
              x: -35,
              y: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* ================================
              STEM
          ================================= */}

          <motion.path
            id="logo-stem"
            d="
              M365 580
              C365 530 389 495 431 482
              C466 471 500 479 529 498
              L750 644
              L642 708
              L435 578
              V1027
              C435 1054 424 1074 403 1087
              L365 1110
              L201 1015
              V790
              L365 692
              Z
            "
            fill="url(#green-stem)"
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.85,
              delay: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* STEM FRONT */}
          <motion.path
            d="
              M201 790
              L365 692
              V1110
              L201 1015
              Z
            "
            fill="#00A878"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            transition={{
              duration: 0.6,
              delay: 0.85,
            }}
          />

          {/* CENTRAL DARK SEAM */}
          <motion.path
            d="
              M435 578
              L642 708
              L750 644
              L529 498
              C500 479 466 471 431 482
              C389 495 365 530 365 580
              V692
              L435 650
              Z
            "
            fill="url(#green-dark)"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.82,
            }}
            transition={{
              duration: 0.7,
              delay: 0.85,
            }}
          />

          {/* TOP GLOSS */}
          <motion.path
            d="
              M205 138
              H690
              C786 138 868 157 938 208
              C982 241 1018 284 1041 334
              C997 294 949 264 895 242
              C835 217 767 207 692 207
              H246
              C208 207 179 196 161 175
              C169 151 183 141 205 138
              Z
            "
            fill="url(#green-highlight)"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0.4],
            }}
            transition={{
              duration: 1.2,
              delay: 1,
              ease: "easeOut",
            }}
          />

          {/* EDGE */}
          <path
            d="
              M205 139
              H690
              C786 139 868 158 938 209
              C1009 261 1054 337 1072 425
            "
            stroke="#70F5C5"
            strokeOpacity={0.24}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* =================================================
            SHINE SWEEP
        ================================================== */}

        <motion.g
          clipPath="url(#logo-clip)"
          initial={{
            x: -900,
            opacity: 0,
          }}
          animate={{
            x: [-900, 1000],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2.4,
            delay: 1.4,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
        >
          <rect
            x="-100"
            y="100"
            width="180"
            height="1000"
            transform="rotate(25 0 0)"
            fill="url(#shine-gradient)"
          />
        </motion.g>

        {/* =================================================
            SPARK
        ================================================== */}

        <motion.g
          id="profilio-spark"
          initial={{
            opacity: 0,
            scale: 0.45,
            rotate: -25,
          }}
          animate={{
            opacity: 1,
            scale: [1, 1.08, 1],
            rotate: 0,
          }}
          transition={{
            opacity: {
              duration: 0.5,
              delay: 1.25,
            },
            scale: {
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 0.7,
              delay: 1.25,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          style={{
            transformOrigin: "1080px 183px",
          }}
        >
          {/* Spark glow */}
          <motion.path
            d="
              M1080 55
              C1075 89 1065 116 1047 139
              C1027 163 1000 177 958 183
              C998 189 1027 203 1047 225
              C1065 246 1076 272 1081 308
              C1087 272 1098 246 1117 224
              C1137 201 1165 189 1204 183
              C1165 176 1138 163 1118 140
              C1100 117 1089 89 1080 55
              Z
            "
            fill="#00B77A"
            filter="url(#glow)"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "1080px 183px",
            }}
          />

          {/* Main spark */}
          <path
            id="logo-spark"
            d="
              M1080 55
              C1075 89 1065 116 1047 139
              C1027 163 1000 177 958 183
              C998 189 1027 203 1047 225
              C1065 246 1076 272 1081 308
              C1087 272 1098 246 1117 224
              C1137 201 1165 189 1204 183
              C1165 176 1138 163 1118 140
              C1100 117 1089 89 1080 55
              Z
            "
            fill="url(#spark-green)"
          />

          {/* Spark highlight */}
          <path
            d="
              M1080 79
              C1075 110 1065 132 1050 150
              C1036 165 1018 175 995 181
              C1019 187 1038 197 1052 212
              C1067 228 1076 248 1081 274
              C1086 248 1095 227 1110 211
              C1125 195 1144 186 1169 181
              C1144 175 1125 165 1111 149
              C1097 132 1087 109 1080 79
              Z
            "
            fill="#7AF5C8"
            opacity={0.16}
          />
        </motion.g>

        {/* =================================================
            FINAL BREATHING SCALE
        ================================================== */}

        <motion.g
          animate={{
            scale: [1, 1.012, 1],
          }}
          transition={{
            duration: 3.8,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "600px 600px",
          }}
        >
          {/* intentionally empty, used as animation timing layer */}
        </motion.g>
      </motion.svg>
    </div>
  );
}

export default Page;