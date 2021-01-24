import { AnimationControls, Target, TargetAndTransition, Transition, VariantLabels } from "framer-motion";

export const animationProps: {
    initial?: boolean | Target | VariantLabels,
    animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean,
    exit?: TargetAndTransition | VariantLabels,
    transition: Transition,
} = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: {
        // ease: [0,1,0,1],
        ease: [0,0,0.3,1],
        // ease: 'easeOut',
        duration: 1,
    }
}