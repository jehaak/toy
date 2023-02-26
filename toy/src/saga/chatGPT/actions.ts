export const INCREASE = 'counter/INCREASE' as const;
export const DECREASE = 'counter/DECREASE' as const;

// 액션 생성함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 액션객체 타입
export type CounterActionType =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>;