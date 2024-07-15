import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerContentProps,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import CContainer from "./CContainer";
import useBackOnClose from "../../../hooks/useBackOnClose";
import useActiveDrawerId from "../../../global/useActiveDrawerId";
import backOnClose from "../../../lib/backOnClose";
import { useLightDarkColor } from "../../../constant/colors";

interface Props extends DrawerContentProps {
  id: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  name?: string;
  placement?: "top" | "bottom" | "left" | "right";
  size?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function CustomDrawer({
  id,
  isOpen,
  onOpen,
  onClose,
  name,
  placement = "bottom",
  size,
  header,
  children,
  footer,
  ...props
}: Props) {
  const theId = name ? `${id}-${name}` : id;
  const { activeDrawerId, setActiveDrawerId } = useActiveDrawerId();
  const activeDrawerIdRef = useRef(activeDrawerId);
  useEffect(() => {
    if (isOpen) {
      const newActiveDrawerId = [...activeDrawerIdRef.current];
      newActiveDrawerId.push(theId);
      setActiveDrawerId(newActiveDrawerId);
    }
  }, [isOpen, setActiveDrawerId, theId]);

  const handleOnClose = useCallback(() => {
    const newActiveDrawerId = [...activeDrawerIdRef.current];
    setActiveDrawerId(newActiveDrawerId);
    onClose();
  }, [onClose, setActiveDrawerId]);
  useBackOnClose(theId, isOpen, onOpen, handleOnClose);
  const initialRef = useRef(null);

  const [touchStart, setTouchStart] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const isSideDrawer = placement === "left" || placement === "right";
  const isLeftOrTopDrawer = placement === "left" || placement === "top";
  const [bodyDrawerScrollPos, setBodyDrawerScrollPos] = useState<number>(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const pos = isSideDrawer
      ? event.touches[0].clientX
      : event.touches[0].clientY;
    setTouchStart(pos);
    setStartTime(Date.now());
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentPos = isSideDrawer
      ? event.touches[0].clientX
      : event.touches[0].clientY;
    const diffPos = currentPos - touchStart;

    if (isLeftOrTopDrawer ? diffPos < 0 : diffPos > 0) {
      setTranslate(diffPos);
      const drawerBody = document.getElementById(
        `drawer-body-${activeDrawerId[activeDrawerId.length - 1]}`
      );
      if (drawerBody) {
        drawerBody.style.transition = "0ms";
        drawerBody.style.transform = isSideDrawer
          ? `translateX(${diffPos}px)`
          : `translateY(${diffPos}px)`;
      }
    }
  };
  const handleTouchEnd = () => {
    const endTime = Date.now();
    const timeDiff = endTime - startTime;
    const speed = Math.abs(translate / timeDiff);
    const speedThreshold = 0.3;

    const drawerBody = document.getElementById(
      `drawer-body-${activeDrawerId[activeDrawerId.length - 1]}`
    );

    if (drawerBody) {
      const comparison = isSideDrawer
        ? isLeftOrTopDrawer
          ? (drawerBody.offsetWidth - 200) * -1
          : drawerBody.offsetWidth - 200
        : isLeftOrTopDrawer
        ? (drawerBody.offsetHeight - 200) * -1
        : drawerBody.offsetHeight - 200;

      if (
        (isLeftOrTopDrawer ? translate < comparison : translate > comparison) ||
        speed > speedThreshold
      ) {
        const newActiveDrawerId = [...activeDrawerId];
        newActiveDrawerId.pop();
        setActiveDrawerId(newActiveDrawerId);
        if (theId === activeDrawerId[activeDrawerId.length - 1]) {
          backOnClose();
        }
      } else {
        drawerBody.style.transition = "200ms";
        drawerBody.style.transform = isSideDrawer
          ? `translateX(0px)`
          : `translateY(0px)`;
      }
    }

    setTranslate(0);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setBodyDrawerScrollPos(target.scrollTop);
  };

  const lightDarkColor = useLightDarkColor();

  return (
    <Drawer
      id={theId}
      isOpen={isOpen}
      onClose={backOnClose}
      initialFocusRef={initialRef}
      placement={placement}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent
        ref={initialRef}
        maxH={!isSideDrawer ? "calc(100% - 12px)" : ""}
        bg={"transparent"}
        {...props}
      >
        <DrawerBody
          id={`drawer-body-${theId}`}
          onTouchStart={(e) => {
            if (theId === activeDrawerId[activeDrawerId.length - 1]) {
              handleTouchStart(e);
            }
          }}
          onTouchMove={(e) => {
            if (theId === activeDrawerId[activeDrawerId.length - 1]) {
              handleTouchMove(e);
            }
          }}
          onTouchEnd={() => {
            if (theId === activeDrawerId[activeDrawerId.length - 1]) {
              handleTouchEnd();
            }
          }}
          px={0}
        >
          {!isSideDrawer && placement === "bottom" && (
            <CContainer onClick={backOnClose}>
              <VStack className="drawerIndicator">
                <Box
                  w={"100px"}
                  h={"6px"}
                  bg={"gray"}
                  opacity={0.5}
                  borderRadius={6}
                  flexShrink={0}
                  mx={"auto"}
                  mb={2}
                />
              </VStack>
            </CContainer>
          )}

          <CContainer
            h={"calc(100% - 14px)"}
            bg={lightDarkColor}
            border={"1px solid var(--divider2)"}
            borderRadius={
              isSideDrawer
                ? ""
                : placement === "top"
                ? "0 0 12px 12px"
                : "12px 12px 0 0"
            }
            overflowY={"auto"}
            gap={0}
          >
            {header}

            <VStack
              align={"stretch"}
              overflowY={"auto"}
              onScroll={handleScroll}
              gap={0}
              onTouchStart={(e) => {
                if (bodyDrawerScrollPos !== 0) {
                  e.stopPropagation();
                } else {
                  const drawerBody = document.getElementById(
                    `drawer-body-${activeDrawerId[activeDrawerId.length - 1]}`
                  );
                  if (drawerBody) {
                    drawerBody.style.transition = "200ms";
                    drawerBody.style.transform = isSideDrawer
                      ? `translateX(0px)`
                      : `translateY(0px)`;
                  }
                }
              }}
              onTouchMove={(e) => {
                if (bodyDrawerScrollPos !== 0) {
                  const currentPos = isSideDrawer
                    ? e.touches[0].clientX
                    : e.touches[0].clientY;
                  setTouchStart(currentPos);
                  e.stopPropagation();
                }
              }}
              onTouchEnd={() => {
                const drawerBody = document.getElementById(
                  `drawer-body-${activeDrawerId[activeDrawerId.length - 1]}`
                );
                if (drawerBody) {
                  drawerBody.style.transition = "200ms";
                  drawerBody.style.transform = isSideDrawer
                    ? `translateX(0px)`
                    : `translateY(0px)`;
                }
              }}
            >
              {children}
            </VStack>

            {footer && (
              <CContainer
                gap={2}
                px={6}
                pb={8}
                pt={"24px"}
                align={"stretch"}
                w={"100%"}
              >
                {footer}
              </CContainer>
            )}
          </CContainer>

          {!isSideDrawer && placement === "top" && (
            <CContainer align={"center"} onClick={backOnClose}>
              <VStack className="drawerIndicator">
                <Box
                  w={"100px"}
                  h={"6px"}
                  bg={"gray"}
                  opacity={0.5}
                  borderRadius={6}
                  flexShrink={0}
                  mx={"auto"}
                  mt={2}
                />
              </VStack>
            </CContainer>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
