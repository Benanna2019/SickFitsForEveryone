import { useSpring, animated } from "@react-spring/web";
import "./cart-count-styles.css";

export default function CartCount({ count }: { count: number }) {
  const { animatedCount } = useSpring({
    from: { animatedCount: 0 },
    animatedCount: count,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <span className="animation__styles">
      <animated.div className="red__dot">
        {animatedCount.to((number) => number.toFixed(0))}
      </animated.div>
    </span>
  );
}
