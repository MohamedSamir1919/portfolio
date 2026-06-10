"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import * as THREE from "three";

// --- 1. ARCHITECTURAL GALLERY-GRADE CHESS PIECES ---
interface PieceProps {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  isWhite: boolean;
  isSelected: boolean;
  position: [number, number, number];
  onClick: (e: any) => void;
}

function ChessPiece({ type, isWhite, isSelected, position, onClick }: PieceProps) {
  const baseColor = isWhite ? "#ffffff" : "#0b1220"; // darker navy tint for better contrast
  const glowColor = "#60a5fa"; // Premium Electric Blue Accent

  // Luxury physical material maps
  const roughness = isWhite ? 0.05 : 0.3;
  const metalness = isWhite ? 0.95 : 0.1;

  return (
    <group position={position} onClick={onClick}>
      {/* Universal Architectural Pedestal Base */}
      <mesh castShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.34, 0.36, 0.12, 4]} /> {/* 4-sided chiseled base */}
        <meshStandardMaterial
          color={isSelected ? glowColor : baseColor}
          roughness={roughness}
          metalness={metalness}
          emissive={!isWhite ? '#07133a' : undefined}
          emissiveIntensity={!isWhite ? 0.06 : undefined}
        />
        {/* Subtle high-end wireframe accent line */}
        <Edges scale={1.01} threshold={15} color={isSelected ? "#60a5fa" : isWhite ? "#cbd5e1" : "#94a3b8"} />
      </mesh>

      {/* --- DESIGNER ABSTRACT FORMS --- */}
      {type === "pawn" && (
        <mesh castShadow position={[0, 0.35, 0]}>
          <coneGeometry args={[0.18, 0.5, 4]} />
          <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} emissive={!isWhite ? '#07133a' : undefined} emissiveIntensity={!isWhite ? 0.06 : undefined} />
          <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#94a3b8"} />
        </mesh>
      )}

      {type === "rook" && (
        <mesh castShadow position={[0, 0.45, 0]}>
          <boxGeometry args={[0.36, 0.65, 0.36]} />
          <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} emissive={!isWhite ? '#07133a' : undefined} emissiveIntensity={!isWhite ? 0.06 : undefined} />
          <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#94a3b8"} />
        </mesh>
      )}

      {type === "knight" && (
        <group position={[0, 0.4, 0]}>
          {/* Asymmetric chiseled monolith */}
          <mesh castShadow rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.22, 0.6, 0.34]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} emissive={!isWhite ? '#07133a' : undefined} emissiveIntensity={!isWhite ? 0.06 : undefined} />
            <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#94a3b8"} />
          </mesh>
        </group>
      )}

      {type === "bishop" && (
        <mesh castShadow position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.28]} />
          <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} />
          <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#1e293b"} />
        </mesh>
      )}

      {type === "queen" && (
        <group position={[0, 0.55, 0]}>
          {/* Slender, multi-faceted fluted pillar */}
          <mesh castShadow>
            <cylinderGeometry args={[0.24, 0.16, 0.8, 8]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} emissive={!isWhite ? '#07133a' : undefined} emissiveIntensity={!isWhite ? 0.06 : undefined} />
            <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#94a3b8"} />
          </mesh>
          <mesh position={[0, 0.46, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={0.0} metalness={1.0} />
          </mesh>
        </group>
      )}

      {type === "king" && (
        <group position={[0, 0.6, 0]}>
          {/* Stately interlocking monolith architecture */}
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.9, 0.32]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} emissive={!isWhite ? '#07133a' : undefined} emissiveIntensity={!isWhite ? 0.06 : undefined} />
            <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#94a3b8"} />
          </mesh>
          {/* Minimalist Crown Finial */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// --- 2. INITIAL BOARD STATE MIGRATION DATA ---
type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";

interface PieceInstance {
  id: string;
  type: PieceType;
  isWhite: boolean;
  x: number;
  z: number;
  hasMoved: boolean;
}

const buildInitialBoardState = (): PieceInstance[] => {
  const dataset: PieceInstance[] = [
    // Black Base Matrix (z = 0)
    { id: "b-r1", type: "rook", isWhite: false, x: 0, z: 0, hasMoved: false },
    { id: "b-n1", type: "knight", isWhite: false, x: 1, z: 0, hasMoved: false },
    { id: "b-b1", type: "bishop", isWhite: false, x: 2, z: 0, hasMoved: false },
    { id: "b-q", type: "queen", isWhite: false, x: 3, z: 0, hasMoved: false },
    { id: "b-k", type: "king", isWhite: false, x: 4, z: 0, hasMoved: false },
    { id: "b-b2", type: "bishop", isWhite: false, x: 5, z: 0, hasMoved: false },
    { id: "b-n2", type: "knight", isWhite: false, x: 6, z: 0, hasMoved: false },
    { id: "b-r2", type: "rook", isWhite: false, x: 7, z: 0, hasMoved: false },

    // White Base Matrix (z = 7)
    { id: "w-r1", type: "rook", isWhite: true, x: 0, z: 7, hasMoved: false },
    { id: "w-n1", type: "knight", isWhite: true, x: 1, z: 7, hasMoved: false },
    { id: "w-b1", type: "bishop", isWhite: true, x: 2, z: 7, hasMoved: false },
    { id: "w-q", type: "queen", isWhite: true, x: 3, z: 7, hasMoved: false },
    { id: "w-k", type: "king", isWhite: true, x: 4, z: 7, hasMoved: false },
    { id: "w-b2", type: "bishop", isWhite: true, x: 5, z: 7, hasMoved: false },
    { id: "w-n2", type: "knight", isWhite: true, x: 6, z: 7, hasMoved: false },
    { id: "w-r2", type: "rook", isWhite: true, x: 7, z: 7, hasMoved: false },
  ];

  for (let col = 0; col < 8; col++) {
    dataset.push({ id: `b-p${col}`, type: "pawn", isWhite: false, x: col, z: 1, hasMoved: false });
    dataset.push({ id: `w-p${col}`, type: "pawn", isWhite: true, x: col, z: 6, hasMoved: false });
  }
  return dataset;
};

// --- 3. HIGH-END PORTFOLIO DISPLAY INTERFACE ---
export default function ChessSection() {
  const [pieces, setPieces] = useState<PieceInstance[]>(buildInitialBoardState());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<{ over: boolean; winner?: 'white' | 'black' }>({ over: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', subtitle: '', body: 'I am happy for somebody like you on my portfolio!' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // helpers for move validation
  const getPieceAt = (x: number, z: number) => pieces.find((p) => p.x === x && p.z === z) || null;

  const isPathClear = (startX: number, startZ: number, targetX: number, targetZ: number) => {
    const dx = Math.sign(targetX - startX);
    const dz = Math.sign(targetZ - startZ);
    let x = startX + dx;
    let z = startZ + dz;
    while (x !== targetX || z !== targetZ) {
      if (getPieceAt(x, z)) return false;
      x += dx;
      z += dz;
    }
    return true;
  };

  const isLegalMove = (piece: PieceInstance, tx: number, tz: number, boardPieces?: PieceInstance[]) => {
    const board = boardPieces || pieces;
    const getPieceAtBoard = (x: number, z: number) => board.find((p) => p.x === x && p.z === z) || null;
    const isPathClearBoard = (startX: number, startZ: number, targetX: number, targetZ: number) => {
      const dx = Math.sign(targetX - startX);
      const dz = Math.sign(targetZ - startZ);
      let x = startX + dx;
      let z = startZ + dz;
      while (x !== targetX || z !== targetZ) {
        if (getPieceAtBoard(x, z)) return false;
        x += dx;
        z += dz;
      }
      return true;
    };

    // bounds
    if (tx < 0 || tx > 7 || tz < 0 || tz > 7) return false;
    if (tx === piece.x && tz === piece.z) return false;
    const target = getPieceAtBoard(tx, tz);
    if (target && target.isWhite === piece.isWhite) return false; // cannot capture own

    const dx = tx - piece.x;
    const dz = tz - piece.z;
    const adx = Math.abs(dx);
    const adz = Math.abs(dz);

    switch (piece.type) {
      case 'pawn': {
        const dir = piece.isWhite ? -1 : 1;
        const startRow = piece.isWhite ? 6 : 1;
        if (dx === 0 && dz === dir && !target) return true;
        if (dx === 0 && dz === 2 * dir && piece.z === startRow) {
          const midZ = piece.z + dir;
          if (!getPieceAtBoard(piece.x, midZ) && !target) return true;
        }
        if (Math.abs(dx) === 1 && dz === dir && target && target.isWhite !== piece.isWhite) return true;
        return false;
      }
      case 'rook':
        if ((dx === 0 || dz === 0) && isPathClearBoard(piece.x, piece.z, tx, tz)) return true;
        return false;
      case 'bishop':
        if (adx === adz && isPathClearBoard(piece.x, piece.z, tx, tz)) return true;
        return false;
      case 'queen':
        if ((dx === 0 || dz === 0 || adx === adz) && isPathClearBoard(piece.x, piece.z, tx, tz)) return true;
        return false;
      case 'knight':
        if ((adx === 1 && adz === 2) || (adx === 2 && adz === 1)) return true;
        return false;
      case 'king': {
        if (Math.max(adx, adz) === 1) return true;
        // Castling: king moves two squares horizontally toward a rook
        if (adz === 0 && adx === 2) {
          const rookX = tx > piece.x ? 7 : 0;
          const rook = getPieceAtBoard(rookX, piece.z);
          if (!rook || rook.type !== 'rook' || rook.isWhite !== piece.isWhite) return false;
          if (piece.hasMoved || rook.hasMoved) return false;
          if (isInCheck(piece.isWhite, board)) return false;

          const step = tx > piece.x ? 1 : -1;
          const betweenX = piece.x + step;
          const pathClear = !getPieceAtBoard(betweenX, piece.z) && !getPieceAtBoard(piece.x + 2 * step, piece.z);
          if (!pathClear) return false;

          // The king cannot cross or land on an attacked square
          if (isSquareAttackedBy(piece.x + step, piece.z, !piece.isWhite, board) || isSquareAttackedBy(piece.x + 2 * step, piece.z, !piece.isWhite, board)) {
            return false;
          }

          return true;
        }
        return false;
      }
      default:
        return false;
    }
  };

  // Get all legal moves for a piece
  const simulateMoveBoard = (piece: PieceInstance, tx: number, tz: number, boardPieces: PieceInstance[]) => {
    const targetPiece = boardPieces.find((p) => p.x === tx && p.z === tz && p.id !== piece.id);
    let nextBoard = boardPieces.filter((p) => !(targetPiece && p.id === targetPiece.id));

    nextBoard = nextBoard.map((p) =>
      p.id === piece.id ? { ...p, x: tx, z: tz, hasMoved: true } : p
    );

    if (piece.type === 'king' && Math.abs(tx - piece.x) === 2 && piece.z === tz) {
      const rookX = tx > piece.x ? 7 : 0;
      const rook = nextBoard.find((p) => p.type === 'rook' && p.x === rookX && p.z === piece.z && p.isWhite === piece.isWhite);
      if (rook) {
        const rookTargetX = tx > piece.x ? tx - 1 : tx + 1;
        nextBoard = nextBoard.map((p) =>
          p.id === rook.id ? { ...p, x: rookTargetX, z: piece.z, hasMoved: true } : p
        );
      }
    }

    return nextBoard;
  };

  const wouldLeaveKingInCheck = (piece: PieceInstance, tx: number, tz: number, boardPieces: PieceInstance[]) => {
    const nextBoard = simulateMoveBoard(piece, tx, tz, boardPieces);
    return isInCheck(piece.isWhite, nextBoard);
  };

  const getLegalMovesForPiece = (piece: PieceInstance, boardPieces: PieceInstance[]) => {
    const moves: [number, number][] = [];
    for (let x = 0; x < 8; x++) {
      for (let z = 0; z < 8; z++) {
        if (isLegalMove(piece, x, z, boardPieces) && !wouldLeaveKingInCheck(piece, x, z, boardPieces)) {
          moves.push([x, z]);
        }
      }
    }
    return moves;
  };

  // Check if a square is attacked by enemy
  const isSquareAttackedBy = (x: number, z: number, byWhite: boolean, boardPieces: PieceInstance[]) => {
    const attackers = boardPieces.filter((p) => p.isWhite === byWhite);
    for (const piece of attackers) {
      if (isLegalMove(piece, x, z, boardPieces)) {
        return true;
      }
    }
    return false;
  };

  // Check if a side is in check
  const isInCheck = (isWhite: boolean, boardPieces: PieceInstance[]) => {
    const king = boardPieces.find((p) => p.type === 'king' && p.isWhite === isWhite);
    if (!king) return false;
    return isSquareAttackedBy(king.x, king.z, !isWhite, boardPieces);
  };

  // Check if a side has any legal moves
  const hasLegalMoves = (isWhite: boolean, boardPieces: PieceInstance[]) => {
    const sidePieces = boardPieces.filter((p) => p.isWhite === isWhite);
    for (const piece of sidePieces) {
      const moves = getLegalMovesForPiece(piece, boardPieces);
      if (moves.length > 0) return true;
    }
    return false;
  };

  // Check for checkmate or stalemate
  const openGameOverModal = (title: string, subtitle: string, body: string) => {
    setModalContent({ title, subtitle, body });
    setModalOpen(true);
  };

  const checkGameEnd = (boardPieces: PieceInstance[], currentTurn: 'white' | 'black') => {
    const isWhiteTurn = currentTurn === 'white';
    const hasMovesForTurn = hasLegalMoves(isWhiteTurn, boardPieces);
    const inCheckForTurn = isInCheck(isWhiteTurn, boardPieces);

    if (!hasMovesForTurn) {
      if (inCheckForTurn) {
        // Checkmate
        const winner = isWhiteTurn ? 'black' : 'white';
        const title = 'Hello there,';
        const subtitle = 'be in touch';
        const body = winner === 'white'
          ? 'Just know the king is the most important piece, but the queen is the most powerful one, so I am happy for somebody like you on my portfolio! you can see some project https://mohamedsamir1919.github.io/mosasha'
          : `♔ Checkmate! ${winner.toUpperCase()} wins!`;
        setMessage(body);
        setGameOver({ over: true, winner });
        setIsThinking(false);
        openGameOverModal(title, subtitle, body);
        return true;
      } else {
        // Stalemate
        const body = `♔ Stalemate! Game is a draw.`;
        setMessage(body);
        setGameOver({ over: true });
        setIsThinking(false);
        openGameOverModal('Hello there,', 'be in touch', body);
        return true;
      }
    }
    return false;
  };

  // Black AI: pick random legal move
  const makeBlackMove = (boardPieces: PieceInstance[]) => {
    const blackPieces = boardPieces.filter((p) => !p.isWhite);
    let legalMoveFound = false;

    while (blackPieces.length > 0 && !legalMoveFound) {
      const randomIdx = Math.floor(Math.random() * blackPieces.length);
      const piece = blackPieces[randomIdx];
      const moves = getLegalMovesForPiece(piece, boardPieces);

      if (moves.length > 0) {
        const [tx, tz] = moves[Math.floor(Math.random() * moves.length)];
        const newBoard = applyMove(piece, tx, tz, boardPieces);
        const targetPiece = boardPieces.find((p) => p.x === tx && p.z === tz && p.id !== piece.id);
        const pieceTypeLabel = piece.type.charAt(0).toUpperCase() + piece.type.slice(1);
        const captureText = targetPiece ? ` (captured ${targetPiece.type})` : '';
        setMessage(`🤖 Black ${pieceTypeLabel} moved to (${tx}, ${tz})${captureText}`);
        setPieces(newBoard);
        setTurn('white');
        setIsThinking(false);
        legalMoveFound = true;
      } else {
        blackPieces.splice(randomIdx, 1);
      }
    }
  };

  // Auto-move black after white moves
  useEffect(() => {
    let isMounted = true;

    if (turn === 'black' && !gameOver.over) {
      const timer = setTimeout(() => {
        if (isMounted) {
          const blackPieces = pieces.filter((p) => !p.isWhite);
          let legalMoveFound = false;

          while (blackPieces.length > 0 && !legalMoveFound) {
            const randomIdx = Math.floor(Math.random() * blackPieces.length);
            const piece = blackPieces[randomIdx];
            const moves = getLegalMovesForPiece(piece, pieces);

            if (moves.length > 0) {
              const [tx, tz] = moves[Math.floor(Math.random() * moves.length)];
              const newBoard = applyMove(piece, tx, tz, pieces);
              const targetPiece = pieces.find((p) => p.x === tx && p.z === tz && p.id !== piece.id);
              const pieceTypeLabel = piece.type.charAt(0).toUpperCase() + piece.type.slice(1);
              const captureText = targetPiece ? ` (captured ${targetPiece.type})` : '';
              setMessage(`🤖 Black ${pieceTypeLabel} moved to (${tx}, ${tz})${captureText}`);
              setPieces(newBoard);
              // Check for game end after black moves
              if (!checkGameEnd(newBoard, 'white')) {
                setTurn('white');
              }
              legalMoveFound = true;
            } else {
              blackPieces.splice(randomIdx, 1);
            }
          }

          // If no legal moves found, check for checkmate/stalemate
          if (!legalMoveFound) {
            checkGameEnd(pieces, 'black');
          }
        }
      }, 1000);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }
  }, [turn, pieces, gameOver.over]);

  const handleSelectPiece = (id: string, event: any) => {
    event.stopPropagation();
    if (gameOver.over) return;
    const piece = pieces.find((p) => p.id === id);
    if (!piece) return;
    // only allow selecting the side whose turn it is
    if ((turn === 'white' && !piece.isWhite) || (turn === 'black' && piece.isWhite)) return;
    setSelectedId(id === selectedId ? null : id);
  };

  const applyMove = (piece: PieceInstance, tx: number, tz: number, boardPieces: PieceInstance[]) => {
    let nextBoard = boardPieces.filter((p) => !(p.x === tx && p.z === tz && p.id !== piece.id));
    nextBoard = nextBoard.map((p) =>
      p.id === piece.id ? { ...p, x: tx, z: tz, hasMoved: true } : p
    );

    if (piece.type === 'king' && Math.abs(tx - piece.x) === 2 && piece.z === tz) {
      const rookX = tx > piece.x ? 7 : 0;
      const rook = nextBoard.find((p) => p.type === 'rook' && p.x === rookX && p.z === piece.z && p.isWhite === piece.isWhite);
      if (rook) {
        const rookTargetX = tx > piece.x ? tx - 1 : tx + 1;
        nextBoard = nextBoard.map((p) =>
          p.id === rook.id ? { ...p, x: rookTargetX, z: piece.z, hasMoved: true } : p
        );
      }
    }

    return nextBoard;
  };

  const handleGridSquareClick = (targetX: number, targetZ: number) => {
    if (gameOver.over || !selectedId) return;
    const piece = pieces.find((p) => p.id === selectedId);
    if (!piece) return;

    if (!isLegalMove(piece, targetX, targetZ)) {
      return;
    }

    const newBoard = applyMove(piece, targetX, targetZ, pieces);
    setPieces(newBoard);
    setSelectedId(null);

    // Check if game ends after white moves
    const newTurn = 'black';
    setTimeout(() => {
      if (!checkGameEnd(newBoard, newTurn)) {
        setTurn(newTurn);
      }
    }, 100);
  };

  return (
    <section id="interactive-space" className="min-h-screen bg-gradient-to-tr from-gray-100 to-white z-10 py-24 px-6 md:px-24 text-white grid lg:grid-cols-12 gap-12 items-center border-t border-zinc-900">
      {/* Branding & Informational Copy */}
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black bg-white border border-zinc-800 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Just simple chess Game
        </div>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-none text-black">
          Portfolio<br />
          <span className="font-semibold text-black">Mohamed Samir</span>
        </h2>
        <p className="text-black text-sm leading-relaxed max-w-sm font-light">
          I am just someone who try to build his own bussiness,
          and I am happy for somebody like you on my portfolio!
          it's simple chess game in three.js,
          I am not designer, I am a developer<br />
        </p>

        {/* Minimalist interactive legend */}
        <div className="pt-4 border-t border-zinc-900 space-y-2 text-[11px] font-mono text-black">
          <p>• <span className="text-black">SELECT:</span> Click a chiseled column node.</p>
          <p>• <span className="text-black">MUTATE:</span> Click an empty monolithic tile grid.</p>
          <p>• <span className="text-black">PERSPECTIVE:</span> Drag canvas to control orbital axis.</p>
        </div>

        {/* Black's Move Message / Game Over */}
        {(message || gameOver.over) && (
          <div className={`mt-4 p-3 border rounded text-sm font-mono ${gameOver.over
              ? 'bg-red-100 border-red-300 text-red-800'
              : 'bg-blue-100 border-blue-300 text-black'
            }`}>
            {gameOver.over ? message : isThinking ? '🤔 Black is thinking...' : message}
          </div>
        )}

        {/* Reset Game Button */}
        {gameOver.over && (
          <button
            onClick={() => {
              setPieces(buildInitialBoardState());
              setSelectedId(null);
              setTurn('white');
              setMessage('');
              setGameOver({ over: false });
              setModalOpen(false);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-mono text-sm"
          >
            New Game
          </button>
        )}

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{modalContent.title || 'Hello there,'}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{modalContent.subtitle || 'be in touch'}</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
              <p className="mt-4 leading-relaxed text-slate-200">{modalContent.body}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href="https://wa.me/201026457619?text=Hello%20Mohamed%2C%20I%20would%20like%20to%20connect."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-400"
                >
                  Send WhatsApp
                </a>
                <a
                  href="https://mohamedsamir1919.github.io/portfolio/Mohamed_samir_cv.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-600"
                >
                  View CV
                </a>
              </div>
              <button
                onClick={() => {
                  setPieces(buildInitialBoardState());
                  setSelectedId(null);
                  setTurn('white');
                  setMessage('');
                  setGameOver({ over: false });
                  setModalOpen(false);
                }}
                className="mt-4 w-full rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Start New Game
              </button>
            </div>
          </div>
        )}
      </div>

      {/* The 3D Viewport Node */}
      <div className="lg:col-span-7 w-full h-[580px] z-10 bg-gradient-to-br from-gray-900 to-black border border-zinc-900 rounded-sm overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <Canvas
          camera={{ position: isMobile ? [0, 10, 18] : [0, 7, 10], fov: isMobile ? 48 : 42 }}
          shadows={{ type: THREE.PCFShadowMap }} // Fixed the deprecation warning too!
        >
          {/* Muted luxury studio illumination */}
          <ambientLight intensity={0.15} />

          {/* Main directional sun creating sharp contrasts */}
          <directionalLight
            position={[8, 16, 5]}
            intensity={2.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />

          {/* Cybernetic accent back-glow light source */}
          <pointLight position={[-6, 2, -6]} intensity={1.5} color="#1d4ed8" />
          <pointLight position={[0, 4, 0]} intensity={0.4} color="#60a5fa" />

          {/* Minimalist Monolithic Board Layout */}
          <group position={[0, -0.08, 0]}>
            {Array.from({ length: 8 }).map((_, x) =>
              Array.from({ length: 8 }).map((_, z) => {
                const isDarkSquare = (x + z) % 2 === 1;
                return (
                  <mesh
                    key={`${x}-${z}`}
                    position={[x - 3.5, 0, z - 3.5]}
                    receiveShadow
                    onClick={() => handleGridSquareClick(x, z)}
                  >
                    <boxGeometry args={[0.96, 0.16, 0.96]} />
                    <meshStandardMaterial
                      color={isDarkSquare ? "#09090b" : "#f4f4f5"}
                      roughness={0.1}
                      metalness={isDarkSquare ? 0.0 : 0.8}
                    />
                    {/* Architectural clean tile outline edge lines */}
                    <Edges threshold={15} color={isDarkSquare ? "#18181b" : "#e4e4e7"} />
                  </mesh>
                );
              })
            )}
          </group>

          {/* Render Active Pieces Pipeline */}
          {pieces.map((piece) => (
            <ChessPiece
              key={piece.id}
              type={piece.type}
              isWhite={piece.isWhite}
              isSelected={selectedId === piece.id}
              position={[piece.x - 3.5, 0.01, piece.z - 3.5]}
              onClick={(e) => handleSelectPiece(piece.id, e)}
            />
          ))}

          {/* Clean Camera Constraint Configurations */}
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.3}
            minPolarAngle={Math.PI / 6}
            maxDistance={isMobile ? 28 : 14}
            minDistance={isMobile ? 8 : 5}
          />
        </Canvas>
      </div>
    </section>
  );
}