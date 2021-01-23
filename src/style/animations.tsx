import { AnimationControls, Target, TargetAndTransition, VariantLabels } from "framer-motion";

export const animationProps: {
    initial?: boolean | Target | VariantLabels,
    animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean,
    exit?:    TargetAndTransition | VariantLabels,
} = {
    initial: { opacity: 0, translateY: 30 },
    animate: { opacity: 1, translateY: 0 },
    exit:    { opacity: 0, translateY: -30 },
}