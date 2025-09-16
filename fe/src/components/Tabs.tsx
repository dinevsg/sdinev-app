// @ts-nocheck
'use client';

import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  isValidElement,
  useMemo,
} from 'react';

interface TabContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  wobbly: boolean;
  hover: boolean;
  defaultValue: string;
  prevIndex: number;
  setPrevIndex: (value: number) => void;
  tabsOrder: string[];
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

interface TabsProviderProps {
  children: ReactNode;
  defaultValue: string;
  wobbly?: boolean;
  hover?: boolean;
}

export const TabsProvider = ({
  children,
  defaultValue,
  wobbly = true,
  hover = false,
}: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const [prevIndex, setPrevIndex] = useState(0);

  // Memoize tab order so it doesn't recalc on every render
  const tabsOrder = useMemo(() => {
    const order: string[] = [];
    React.Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === TabsContent) {
        order.push(child.props.value);
      }
    });
    return order;
  }, [children]);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        wobbly,
        hover,
        defaultValue,
        setPrevIndex,
        prevIndex,
        tabsOrder,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const TabsBtn = ({ children, className, value }: any) => {
  const {
    activeTab,
    setPrevIndex,
    setActiveTab,
    defaultValue,
    hover,
    wobbly,
    tabsOrder,
  } = useTabs();

  const handleClick = () => {
    setPrevIndex(tabsOrder.indexOf(activeTab));
    setActiveTab(value);
  };

  return (
    <motion.div
      className={cn(
        `cursor-pointer sm:p-2 p-1 sm:px-4 px-2 rounded-2xl relative`,
        className
      )}
      onFocus={() => hover && handleClick()}
      onMouseEnter={() => hover && handleClick()}
      onClick={handleClick}
    >
      {children}

      {/* Highlight background */}
      {activeTab === value && (
        <motion.div
          layoutId={`highlight-${defaultValue}`}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute w-full h-full left-0 top-0 bg-slate-800/20 rounded-2xl z-[1]"
        />
      )}

      {/* Wobbly double highlight (optional) */}
      {wobbly && activeTab === value && (
        <>
          <motion.div
            layoutId={`wobbly-${defaultValue}`}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute w-full h-full left-0 top-0 dark:bg-primary-base bg-slate-800/20 rounded-2xl z-[1] tab-shadow"
          />
          <motion.div
            layoutId={`wobbly-b-${defaultValue}`}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute w-full h-full left-0 top-0 dark:bg-primary-base bg-indigo-500 rounded-2xl z-[1] tab-shadow"
          />
        </>
      )}
    </motion.div>
  );
};

export const TabsContent = ({ children, className, value, yValue }: any) => {
  const { activeTab, tabsOrder, prevIndex } = useTabs();
  const isForward = tabsOrder.indexOf(activeTab) > prevIndex;

  return (
    <AnimatePresence mode="wait">
      {activeTab === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: yValue ? (isForward ? 20 : -20) : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: yValue ? (isForward ? -20 : 20) : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn('', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};